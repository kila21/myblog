import { useNavigate } from "react-router-dom"
import type { CardPropsType } from "../../types/props/CardPropsType"
import { Bookmark, Eye, Heart } from "lucide-react"
import { useAppSelector } from "../../store/hooks"

import { togglePostLike } from "../../services/commonService"
import { useState } from "react"


export const Card = (props: CardPropsType) =>{
    const [likeData, setLikeData] = useState<{liked: boolean, likesCount: number}>({liked: props.is_liked, likesCount: props.likes})

    const [bookmarkData, setBookmarkData] = useState<{bookmarked: boolean, bookmarksCount: number}>({bookmarked: props.is_bookmarked, bookmarksCount: props.bookmarks})

    const navigate = useNavigate()
    const authState = useAppSelector((state) => state.auth)

    const handleToggleLike = async () => {
        if (authState.user) {
            try {
                const response = await togglePostLike(props.slug)
                if (response.status === 200 && likeData.liked) {
                    setLikeData(prev => ({liked: false, likesCount: prev.likesCount - 1}))
                } else {
                    setLikeData(prev => ({liked: true, likesCount: prev.likesCount + 1}))
                }
                console.log(response)
            } catch(err) {
                // error message for ui
                alert('Like wont Work pls try Again.' + err)
            }
        }
    }

    return (
        <article className="flex flex-col w-80 sm:w-70">
            {/* <img src="" alt=""/> */}
            <div className="w-full h-48 bg-amber-100 rounded-2xl cursor-pointer" onClick={() => navigate(`/post/${props.slug}`)}></div>
            <div className="w-full pl-3 mt-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                        <Heart 
                        className="cursor-pointer"
                        color={(authState.user && likeData.liked) ? 'red' : 'grey'}
                        onClick={handleToggleLike}
                        />
                        <span>{likeData.likesCount}</span>
                    </div>

                    <div className="flex gap-2">
                        <Bookmark 
                        className="cursor-pointer" 
                        color={(authState.user && bookmarkData.bookmarked)? 'red' : 'grey'}/>
                        <span>{bookmarkData.bookmarksCount}</span>
                    </div>

                    <div className="flex gap-2">
                        <Eye color="grey"/>
                        <span>{props.views}</span>
                    </div>
                </div>
                <h3 className="text-md text-lightgrey cursor-pointer" onClick={() => navigate(`/post/${props.slug}`)}>{props.title}</h3> 
                <time className="text-lightgrey text-sm" dateTime="2025-06-01">{props.date}</time>
            </div>
        </article>
    )
}