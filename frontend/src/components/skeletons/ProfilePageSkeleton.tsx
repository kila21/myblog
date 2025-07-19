import Skeleton from "react-loading-skeleton"

export const ProfilePageSkeleton = () => {
    return (
        <div className="flex flex-col">
            <div className="w-full flex flex-col md:flex-row md:justify-between">
                <div className="w-full md:w-1/2 flex flex-col items-center gap-2">
                    <div className='w-50 h-50 rounded-full overflow-hidden shadow-sm'>
                        <Skeleton circle={true} width={'100%'} height={'100%'}/>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Skeleton width={'50px'}/>
                        <Skeleton width={'100px'}/>
                        <Skeleton width={'150px'}/>
                    </div>
                </div>

                <div className="flex flex-col w-full items-center gap-3 my-5">
                    <Skeleton width='150px' />
                    <div className="flex gap-3">
                        <Skeleton width='50px' />
                        <Skeleton width='50px' />
                        <Skeleton width='50px' />
                    </div>
                    <Skeleton width='200px'/>
                    <Skeleton width='250px' />
                </div>
            </div>
        </div>
    )
}