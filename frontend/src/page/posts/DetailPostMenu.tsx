import { useState } from "react";

import { useDeletePostMutation } from "../../store/posts/postsService";
import { useNavigate } from "react-router-dom";

export const DetailPostMenu = (props: {author: boolean, slug: string}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [ deletePost] = useDeletePostMutation()
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await deletePost(props.slug).unwrap();
            navigate('/');
        }catch (error) {
            alert("Failed to delete post:" + error);
        }
    }
 
    return (
        props.author && (
            <div className="relative">
                <span className="mr-3 md:mr-10 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>...</span>
                {isOpen && (
                    <div className="absolute right-10 top-7 w-40
                    rounded-lg shadow-lg bg-Mainbg border-1 border-lightgrey">
                        <ul className="flex flex-col gap-2 items-center cursor-pointer">
                            <li>Edit Post</li>
                            <li className="text-neon-green"
                                onClick={() => handleDelete()}
                                >
                                    Delete Post
                            </li>
                        </ul>
                    </div>
                )}
            </div>
    ))
}