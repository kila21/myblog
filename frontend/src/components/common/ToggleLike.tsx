import { useState } from "react"
import { Heart } from "lucide-react"

import { useAppSelector } from "../../store/hooks"
import { useToggleLikeMutation } from "../../store/posts/postsService"


export const ToggleLike = (props: {slug: string, liked: boolean, count: number}) => {

    const [toggleLike] = useToggleLikeMutation()

    const authState = useAppSelector(state => state.auth)
    const [likeData, setLikeData] = useState<{liked: boolean, likesCount: number}>({liked: props.liked, likesCount: props.count})

        // like and unlike
    const handleToggleLike = async () => {
        if (authState.user) {
            try {
                const response = await toggleLike(props.slug).unwrap()

                if (response.likes.startsWith('Liked')) {
                    setLikeData(prev => ({liked: true, likesCount: prev.likesCount + 1}))
                } else {
                    setLikeData(prev => ({liked: false, likesCount: prev.likesCount - 1}))
                }

            } catch(err) {
                // error message for ui
                alert('Like wont Work pls try Again.' + err)
            }
        } else {
            alert('You Need to Login!')
        }
    }


    return (
        <div className="flex gap-2">
            <Heart 
            className="cursor-pointer"
            color={(authState.user && likeData.liked) ? 'red' : 'grey'}
            onClick={handleToggleLike}
            />
            <span>{likeData.likesCount}</span>
        </div>
    )
}