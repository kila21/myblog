import { useEffect, useState } from "react";
import { Card } from "../../components/common/Card"
import { getUserPosts } from "../../services/commonService";
import type { PostResponseType } from "../../types/post/PostResponse";


export const ProfilePosts = (props: {username: string}) => {
    const [posts, setPosts ] = useState<PostResponseType[]>()

    const fetchUserPosts = async () => {
        try {
            const response = await getUserPosts(props.username)
            if (response.data) {
                setPosts(response.data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchUserPosts()
    }, [])

    return (
        <div className="w-full flex flex-col items-center gap-3 mb-10">
            <h3 className="bold text-white mb-5 uppercase">{props.username}'s posts:</h3>
            <div className="flex justify-around flex-wrap gap-10">
                {posts && posts.map((post: PostResponseType) => {
                    return <Card 
                    img={''} 
                    title={post.title}
                    date={post.date}
                    slug={post.slug}
                    />
                })}
            </div>
        </div>
    )
}