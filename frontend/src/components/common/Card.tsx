import { useNavigate } from "react-router-dom"
import { Eye } from "lucide-react"

import type { CardPropsType } from "../../types/props/CardPropsType"
import { ToggleBookmark } from "./ToggleBookmark"
import { ToggleLike } from "./ToggleLike"


export const Card = (props: CardPropsType) =>{
    const navigate = useNavigate()
    return (
        <article className="flex flex-col w-80 sm:w-70">
            {/* <img src="" alt=""/> */}
            <div className="w-full h-48 bg-amber-100 rounded-2xl cursor-pointer" onClick={() => navigate(`/post/${props.slug}`)}></div>
            <div className="w-full pl-3 mt-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <ToggleLike slug={props.slug} liked={props.is_liked} count={props.likes} />
                    <ToggleBookmark slug={props.slug} bookmarked={props.is_bookmarked} count={props.bookmarks} />

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