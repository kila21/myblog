import Skeleton from "react-loading-skeleton"


export const DetailPostSkeleton = () => {
    return (
        <div className="flex flex-col items-center mb-20 mt-20">
            <div className="w-ful flex justify-center mb-10">
                <Skeleton width={300} height={30}/>
            </div>

            <div className="flex flex-col w-70 rounded-2xl">
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
                    <div className="w-full flex items-center">
                        <p className="text-lightgrey text:sm mt-2 pb-2 border-b-1 mr-10">Author: </p>
                        <Skeleton width={100} height={20}></Skeleton>
                    </div>
                    <div className="w-full flex items-center">
                        <p className="text-lightgrey text:sm mt-2 pb-2 border-b-1 mr-10">Created At: </p>
                        <Skeleton width={100} height={20}></Skeleton>
                    </div>
                </div>
            </div>
        </div>
    )

}