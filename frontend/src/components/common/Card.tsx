import { useNavigate } from "react-router-dom"
import type { CardPropsType } from "../../types/props/CardPropsType"
import { Bookmark, Eye, Heart } from "lucide-react"

export const Card = (props: CardPropsType) =>{
    const navigate = useNavigate()
    return (
        <article className="flex flex-col w-80 sm:w-70" onClick={() => navigate(`/post/${props.slug}`)}>
            {/* <img src="" alt=""/> */}
            <div className="w-full h-48 bg-amber-100 rounded-2xl"></div>
            <div className="w-full pl-3 mt-4 flex flex-col gap-2">
                <div className="flex items-center justify-around">
                    <div className="flex gap-2">
                        <Heart />
                        <span>{props.likes}</span>
                    </div>

                    <div className="flex gap-2">
                        <Bookmark />
                        <span>{props.bookmarks}</span>
                    </div>

                    <div className="flex">
                        <Eye />
                        <span>{props.views}</span>
                    </div>
                </div>
                <h3 className="text-md text-lightgrey">{props.title}</h3> 
                <time className="text-lightgrey text-sm" dateTime="2025-06-01">{props.date}</time>
            </div>
        </article>
    )
}