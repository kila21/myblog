import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDetailPost } from "../../services/commonService"
import type { PostResponseType } from "../../types/post/PostResponse"
import { formatDate } from "../../utils/date"

import { ArrowLeft, Eye, Heart } from "lucide-react"


export const DetailPost = () => {
    const { slug } = useParams<{slug: string}>()
    const navigate = useNavigate()
    
    const [postData, setPostData] = useState<PostResponseType>()

    // get full post by slug
    const getPostData = async () => {
        try {
            if (slug){
                const response = await getDetailPost(slug)
                if (response.status === 200) {
                    setPostData(response.data)
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
                        <div className="flex gap-3 cursor-pointer">
                            <Heart color="white"/>
                            <p className="text-lightgrey">{postData?.likes_count}</p>
                        </div>

                        <div className="flex gap-3">
                            <Eye color="white"/>
                            <p className="text-lightgrey">{postData?.likes_count}</p>
                        </div>
                    </div>
                </section>
                <p className="text-lightgrey text:sm mt-2 pb-2 border-b-1">Author: {postData?.author_username}</p>
                <p className="text-lightgrey text:sm mt-2 pb-2 border-b-1">created At: {postData && formatDate(postData?.date)}</p>
            </main>
            
            

            <section className="flex flex-col px-5 my-10 md:px-10 ">
                {postData?.tags && <h3 className="py-3">#{postData?.tags}</h3>}
                <p className="text-md text-lightgrey break-words">
                    {postData?.description}
                </p>
            </section>

        </>
       
    )
}