import { Card } from "../../components/common/Card"
import type { PostResponseType } from "../../types/post/PostResponse";

import { formatDate } from "../../utils/date";

import { useGetUserPostsQuery } from "../../store/profile/profileService";


export const ProfilePosts = (props: {username: string}) => {
    const { data: posts, isError } = useGetUserPostsQuery(props.username)

    return (
        <>
            {isError && <div className="text-center">Some Error, Posts Aren'n Avaliable!</div>}
            {posts && 
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
            }
        </>
        
    )
}