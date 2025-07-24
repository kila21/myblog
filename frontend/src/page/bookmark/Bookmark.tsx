import { useAppSelector } from "../../store/hooks"
import { useNavigate } from "react-router-dom"


import { useGetUserBookmarksQuery } from "../../store/posts/postsService"

import { ArrowLeft } from "lucide-react"
import { Card } from "../../components/common/Card"
import { CardSkeleton } from "../../components/skeletons/CardSkeleton"

import type { PostType } from "../../types/post/PaginatedPostResponseType"

import { formatDate } from "../../utils/date"

export const Bookmark = () => {
    const isAuth = useAppSelector(state => state.auth.user)
    const navigate = useNavigate()

    const {data: posts, isError, isLoading} = useGetUserBookmarksQuery(isAuth!, {
        skip: !isAuth,
        refetchOnMountOrArgChange: true,

    })

    return (
        <>
            <span className="mt-20 mb-5 ml-5 w-20 flex gap-1 cursor-pointer" onClick={() => navigate(-1)}>
                <ArrowLeft color="white"/>
                <span>back</span>
            </span>
            <div className="w-full h-full flex flex-col items-center gap-2">
                <h1 className='text-xl md:text-2xl'>{isAuth ? isAuth.toUpperCase() : ''}'s Bookmarks</h1>

                <section className="w-full flex flex-wrap gap-10 p-10 justify-center mt-10">
                    {isLoading && new Array(3).fill(null).map((item, index) => <CardSkeleton key={item + index + 'skeleton'}/>)}
                    {isError && <div>"Failed to load posts. Please try again later."</div>}
                    { posts && posts.results.map((post: PostType) => {
                        return <Card 
                        key={post.slug + '-' + post.id + '-' + post.author} 
                        title={post.title} 
                        img={post.image} 
                        date={formatDate(post.date)}
                        slug={post.slug}
                        likes={post.likes_count}
                        bookmarks={post.bookmarkes_count}
                        views={post.view}
                        is_liked={post.is_liked}
                        is_bookmarked={post.is_bookmarked}
                        />
                    })}
                </section>
            </div>
        </>
    )
}