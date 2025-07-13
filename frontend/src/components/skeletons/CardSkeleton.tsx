import Skeleton from "react-loading-skeleton"


export const CardSkeleton = () => {
    return <Skeleton count={1} width={50} height={100} baseColor="#d1d5db" highlightColor="#e5e7eb"></Skeleton>
}