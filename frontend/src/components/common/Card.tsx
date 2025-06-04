import type { CardPropsType } from "../../types/props/CardPropsType"

export const Card = (props: CardPropsType) =>{
    return (
        <article className="flex flex-col w-70 sm:w-50">
            {/* <img src="" alt=""/> */}
            <div className="w-full h-48 bg-amber-100 rounded-2xl"></div>
            <div className="w-full p-3 mt-4 flex flex-col gap-2">
                <h3 className="text-md text-lightgrey">{props.title}</h3> 
                <time className="text-lightgrey text-sm" dateTime="2025-06-01">{props.date}</time>
            </div>
        </article>
    )
}