import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useCreatePostMutation, useGetCategoriesQuery } from "../../store/posts/postsService";

import type { CreatePostFormDataType } from "../../types/post/CreatePostFormDataType";


export const CreatePost = () => {
    const { register, handleSubmit, formState: {errors} } = useForm<CreatePostFormDataType>();

    const { data: categories } = useGetCategoriesQuery();
    const [createPost, { isLoading, isSuccess, error }] = useCreatePostMutation();

    const navigate = useNavigate();

    const onSubmit = async (data: CreatePostFormDataType) => {
        const postData = new FormData();
        postData.append("title", data.title);
        postData.append("description", data.description);
        postData.append("category", data.category.toString());
        postData.append("image", data.image ? data.image[0] : "");
        try {
            await createPost(postData);
            if (isSuccess) {
                console.log("Post created successfully");
                alert("Post created successfully:");
                navigate('/')
            } else if (error) {
                alert("Error creating post: "+ error);
            }
        }catch (err) {
            console.error("Failed to create post:", err);
        }
    }
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4">Create Post</h1>
            <div className="w-3/4 max-w-2xl p-6 bg-[#292C36] rounded-lg shadow-md 
            border-4 border-solid border-[#3A3D46]">
                <form onSubmit={handleSubmit(onSubmit)}
                 className="space-y-4 text-white text-[12px] sm:text-sm">
                    <div>
                        <label htmlFor='title' className="block">Post Title</label>
                        <input id="title" type="text"
                         className={`mt-1 block w-full border-1 px-3 font-sm text-[#B0B3BC]
                          rounded-md outline-0 ${errors?.title ? 'border-red-500' : 'border-white'}`}
                          placeholder="Enter post title"
                         {...register("title", { required: true })}
                        />
                    </div>

                    <div className="flex">
                        <label htmlFor="image"
                         className={`${errors.image ? 'text-red-500' : 'text-[#B0B3BC]'}`}
                         >Upload a Image</label>
                        <input id="image" type="file" accept="image/*"
                         className={`ml-2 w-2/3 border-1 hidden`}
                         {...register("image", { required: true })} />
                    </div>

                    <div>
                        <label htmlFor="description" className="block">Content</label>
                        <textarea id="description"
                         className={`mt-1 block w-full border-1 p-3 rounded-md shadow-sm outline-0
                           ${errors?.description ? 'border-red-500' : 'border-white'}`} 
                          rows={5}
                          placeholder="Write your post content here"
                          {...register("description", { required: true })}
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor='category' className="block ">Choose Category: </label>
                        <select id="category"
                          className="block w-1/3 mt-2 border-1 px-3 outline-0 bg-[#23262F]"
                          {...register("category", { required: true })}
                         >
                            {categories?.results && categories.results.map((category) => {
                                return (
                                    <option defaultChecked key={category.id} value={category.id}>
                                        {category.title}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <button disabled={isLoading} type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Create Post</button>
                </form>
            </div>
        </div>
    )
}

