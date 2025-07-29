import Skeleton from "react-loading-skeleton"
import { CardSkeleton } from "./CardSkeleton"


export const BookmarkSkeleton = () => {
    return (
        <div className="w-full flex flex-col items-center gap-3">
            <Skeleton width={'150px'}/>

            <div className="flex w-full gap-2 flex-wrap p-10 justify-center md:justify-between">
                {new Array(3).fill(null).map((_, index) => <CardSkeleton key={index + 'Bookmark skeleton'}/>)}
            </div>
        </div>
    )
}