import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { useGetCategoriesQuery, useGetPostQuery, useUpdatePostMutation } from "../../store/posts/postsService";
import type { CreatePostFormDataType } from "../../types/post/CreatePostFormDataType";

export const EditPost = () => {
    const { slug } = useParams<{slug: string}>();
    const navigate = useNavigate();

    const { data: categories } = useGetCategoriesQuery();
    // fetch the post for initial values
    const { data: postData } = useGetPostQuery(slug!, {
        skip: !slug
    })

    const [ updatePost, isLoading ] = useUpdatePostMutation();

    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<CreatePostFormDataType>();
    const selectedImage = watch('image');
    
    const onSubmit = async (data: CreatePostFormDataType) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category.toString());
        if(data.image && data.image.length > 0) {
            formData.append('image', data.image[0]);
        }

        try {
            await updatePost({slug: slug!, formData}).unwrap();
            navigate('/post/' + slug);
        }catch (error: any) {
            alert("Failed to update post: " + error?.data?.detail ? 
                error.data.detail
                 : 
                'An error occurred');
        }
    }

    useEffect(() => {
        if (postData) {
            reset({
                title: postData.title,
                description: postData.description,
                category: postData.category,
            })
        }
    }, [postData, reset]);
    return (
        <div className="w-full flex flex-col items-center justify-center mb-10">
            <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
            <div className="w-3/4 max-w-2xl p-6 bg-[#292C36] rounded-lg shadow-md 
            border-4 border-solid border-[#3A3D46]">
                <form onSubmit={handleSubmit(onSubmit)}
                 className="space-y-4 text-white text-[12px] sm:text-sm">
                    <div>
                        <label htmlFor='title' className="block">Post Title</label>
                        <input id="title" type="text"
                            className={`mt-1 block h-10 w-full border-1 px-3 font-sm text-[#B0B3BC]
                            rounded-md outline-0 ${errors?.title ? 'border-red-500' : 'border-white'}`}
                           
                         {...register("title", { required: true })}
                        />
                    </div>

                    <div className="flex">
                        <label htmlFor="image"
                         className={`${errors.image ? 'text-red-500' : 'text-[#B0B3BC]'}`}
                         >Upload a Image</label>
                        <input id="image" type="file" accept="image/*"
                         className={`ml-2 w-2/3 border-1 hidden`}
                         {...register("image")} 
                         />

                        {selectedImage && selectedImage.length > 0 && 
                         <p className="text-green-600 text-sm">
                            ✅{selectedImage[0].name} updated successfully!
                         </p>
                        }
                        {postData?.image && !selectedImage && (
                            <div className="ml-5 mb-3">
                                <p className="text-sm text-gray-500">Current image:</p>
                                <img 
                                    src={postData.image} 
                                    alt="Current Post image" 
                                    className="h-20 rounded-md border mt-3"
                                />
                            </div>
                        )}
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
                          className="block w-2/3 sm:w-1/3 h-8 mt-2 border-1 px-3 outline-0 bg-[#23262F]"
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
                    <button 
                        // disabled={isLoading} 
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-2
                        px-4 rounded-md hover:bg-blue-700"
                        >
                        Update Post
                    </button>
                </form>
            </div>
        </div>
    )
}
