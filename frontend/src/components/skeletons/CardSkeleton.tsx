import Skeleton from "react-loading-skeleton"


export const CardSkeleton = () => {
    return (
        <div className="flex flex-col w-80 sm:w-70 rounded-2xl">
            <Skeleton height={'10rem'}></Skeleton>
            <div className="flex gap-2 justify-between">
                <div className="flex gap-1">
                    <Skeleton width={25}></Skeleton>
                    <Skeleton width={10}></Skeleton>
                </div>
                
                <div className="flex gap-1">
                    <Skeleton width={25}></Skeleton>
                    <Skeleton width={10}></Skeleton>
                </div>

                <div className="flex gap-1">
                    <Skeleton width={25}></Skeleton>
                    <Skeleton width={10}></Skeleton>
                </div>
            </div>
            
            <div className="flex flex-col items-center w-full">
                <div className="w-11/12">
                    <Skeleton width={'100%'} height={15}></Skeleton>
                </div>
                <div className="w-3/5">
                    <Skeleton width={'100%'} height={15}></Skeleton>
                </div>
            </div>
        </div>
    )

}