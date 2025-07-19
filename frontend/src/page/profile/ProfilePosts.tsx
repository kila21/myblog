import { useEffect, useState } from "react";
import { Card } from "../../components/common/Card"
import { getUserPosts } from "../../services/commonService";
import type { PostResponseType } from "../../types/post/PostResponse";

import { formatDate } from "../../utils/date";


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
        <div className="w-full flex flex-col items-center gap-3 mb-10 ">
            <h3 className="bold text-white mb-5 uppercase">{props.username}'s posts:</h3>
            <div className="w-full flex justify-around flex-wrap gap-10">
                {posts && posts.map((post: PostResponseType) => {
                    return <Card 
                    img={''} 
                    title={post.title}
                    date={formatDate(post.date)}
                    slug={post.slug}
                    key={post.id + post.title}
                    likes={post.likes_count}
                    bookmarks={post.bookmarkes_count}
                    views={post.view}
                    is_liked={post.is_liked}
                    is_bookmarked={post.is_bookmarked}
                    />
                })}
            </div>
        </div>
    )
}