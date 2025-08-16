import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Eye } from "lucide-react"

import { DetailPostMenu } from "./DetailPostMenu"

import { formatDate } from "../../utils/date"

import { ToggleBookmark } from "../../components/common/ToggleBookmark"
import { ToggleLike } from "../../components/common/ToggleLike"
import { useGetPostQuery } from "../../store/posts/postsService"
import { DetailPostSkeleton } from "../../components/skeletons/DetailPostSkeleton"
import { useAppSelector } from "../../store/hooks"

export const DetailPost = () => {
    const { slug } = useParams<{slug: string}>()
    const navigate = useNavigate()
    const user = useAppSelector((state) => state.auth)

    const {
        data: post,
        isLoading,
        isSuccess,
        isError,
    } = useGetPostQuery(slug!, {skip: !slug})

    return (
        <>
        {isLoading && <DetailPostSkeleton />}
        {isError && <div className="text-center m-20">Something went Wrong. Pls refresh the page.</div>}
        {post && isSuccess &&
            <>
            <div className="flex justify-between w-full px-5 mt-15">
                <span className="w-20 flex gap-1 cursor-pointer" onClick={() => navigate(-1)}>
                    <ArrowLeft color="white"/>
                    <span>back</span>
                </span>
                <DetailPostMenu
                    author={post?.author_username === user?.user}
                    slug={post?.slug}
                 />  
            </div>
            <main className="flex flex-col items-center px-5">
                <h1 className="text-bold uppercase mb-5">{post?.title}</h1>
                <hr className="gradiant-main h-0.5 w-25 border-none"/>
                
                <img className="mt-10 min-w-60 h-48 bg-amber-100 rounded-2xl"
                 src={post?.image!}
                 alt={`${post.slug} + image`}/>
                

                {/* post likes views tags */}
                <section className="flex flex-col mt-5">
                    <div className="w-full flex gap-15">
                        <ToggleLike slug={post!.slug} liked={post!.is_liked} count={post!.likes_count}/>
                        <ToggleBookmark slug={post!.slug} bookmarked={post!.is_bookmarked} count={post!.bookmarkes_count}/>

                        <div className="flex gap-3">
                            <Eye color="white"/>
                            <p className="text-lightgrey">{post?.view}</p>
                        </div>
                    </div>
                </section>
                <p className="text-lightgrey text:sm mt-2 pb-2 border-b-1">
                    Author: <span className="font-bold text-white cursor-pointer" 
                    onClick={() => navigate(`/profile/${post?.author_username}`)}>{ post?.author_username } 
                    </span>
                </p>
                <p className="text-lightgrey text:sm mt-2 pb-2 border-b-1">
                    Created At: <span className="text-white font-semibold">{post && formatDate(post?.date)} </span>
                </p>
            </main>
            
            <section className="flex flex-col px-5 my-10 md:px-10 ">
                {post?.tags && <h3 className="py-3">#{post?.tags}</h3>}
                <p className="text-md text-lightgrey break-words">
                    {post?.description}
                </p>
            </section>    
            </>}
        </>
    )
}