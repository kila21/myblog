import { useNavigate } from "react-router-dom"
import type { CardPropsType } from "../../types/props/CardPropsType"
import { Bookmark, Eye, Heart } from "lucide-react"
import { useAppSelector } from "../../store/hooks"


export const Card = (props: CardPropsType) =>{
    const navigate = useNavigate()
    const authState = useAppSelector((state) => state.auth)

    return (
        <article className="flex flex-col w-80 sm:w-70">
            {/* <img src="" alt=""/> */}
            <div className="w-full h-48 bg-amber-100 rounded-2xl" onClick={() => navigate(`/post/${props.slug}`)}></div>
            <div className="w-full pl-3 mt-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                        <Heart 
                        className="cursor-pointer"
                        color={(authState.user && props.is_liked) ? 'red' : 'grey'}
                        />
                        <span>{props.likes}</span>
                    </div>

                    <div className="flex gap-2">
                        <Bookmark 
                        className="cursor-pointer" 
                        color={(authState.user && props.is_bookmarked)? 'red' : 'grey'}/>
                        <span>{props.bookmarks}</span>
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