import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Eye } from "lucide-react"

import { getDetailPost } from "../../services/commonService"

import { formatDate } from "../../utils/date"
import type { PostResponseType } from "../../types/post/PostResponse"
import { ToggleBookmark } from "../../components/common/ToggleBookmark"
import { ToggleLike } from "../../components/common/ToggleLike"

export const DetailPost = () => {
    const { slug } = useParams<{slug: string}>()
    const navigate = useNavigate()

    const [loading, setIsLoading] = useState(true)

    const [postData, setPostData] = useState<PostResponseType>()

    // get full post by slug
    const getPostData = async () => {
        try {
            if (slug){
                const response = await getDetailPost(slug)
                if (response.status === 200) {
                    setPostData(response.data)
                    setIsLoading(false)
                }
            } else {
                navigate('/')
            }
        } catch ( err ) {
            console.log(err)
        }
    }
    
    useEffect(() => {
        getPostData()
    }, [])

    return (
        <>
        {loading ? <div>Loading Component!... </div> : 
            <>
            <span className="mt-20 mb-5 ml-5 w-20 flex gap-1 cursor-pointer" onClick={() => navigate(-1)}>
                <ArrowLeft color="white"/>
                <span>back</span>
            </span>
            <main className="flex flex-col items-center px-5">
                <h1 className="text-bold uppercase mb-5">{postData?.title}</h1>
                <hr className="gradiant-main h-0.5 w-25 border-none"/>
                
                {/* <img src={postData?.image} alt="post image"/> */}
                <div className="mt-10 min-w-60 h-48 bg-amber-100 rounded-2xl"></div>

                {/* post likes views tags */}
                <section className="flex flex-col mt-5">
                    <div className="w-full flex gap-15">
                        <ToggleLike slug={postData!.slug} liked={postData!.is_liked} count={postData!.likes_count}/>
                        <ToggleBookmark slug={postData!.slug} bookmarked={postData!.is_bookmarked} count={postData!.bookmarkes_count}/>

                        <div className="flex gap-3">
                            <Eye color="white"/>
                            <p className="text-lightgrey">{postData?.view}</p>
                        </div>
                    </div>
                </section>
                <p className="text-lightgrey text:sm mt-2 pb-2 border-b-1">
                    Author: <span className="font-bold text-white cursor-pointer" 
                    onClick={() => navigate(`/profile/${postData?.author_username}`)}>{ postData?.author_username } 
                    </span>
                </p>
                <p className="text-lightgrey text:sm mt-2 pb-2 border-b-1">
                    Created At: <span className="text-white font-semibold">{postData && formatDate(postData?.date)} </span>
                </p>
            </main>
            
            <section className="flex flex-col px-5 my-10 md:px-10 ">
                {postData?.tags && <h3 className="py-3">#{postData?.tags}</h3>}
                <p className="text-md text-lightgrey break-words">
                    {postData?.description}
                </p>
            </section>    
            </>}
        </>
    )
}