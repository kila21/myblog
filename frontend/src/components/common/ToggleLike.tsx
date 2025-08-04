import { Heart } from "lucide-react"

import { useAppSelector } from "../../store/hooks"
import { useTogglePostLikeMutation } from "../../store/posts/postsService"
import { useState } from "react"
import { Modal } from "../modals/Modal"
import { UserListModal } from "../modals/UserListModal"


export const ToggleLike = (props: {slug: string, liked: boolean, count: number}) => {
    const authState = useAppSelector(state => state.auth)
    const [togglePostLike] = useTogglePostLikeMutation()

    const [isModalOpen, setIsModalOpen ] = useState(false)

    // like and unlike
    const handleToggleLike = async () => {
        if (authState.user) {
            try {
                await togglePostLike(props.slug).unwrap()
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
            color={(authState.user && props.liked) ? 'red' : 'grey'}
            onClick={handleToggleLike}
            />
            <span onClick={() => setIsModalOpen(true)}>{props.count}</span>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Liked by">
                <UserListModal slug={props.slug} type='likes'/>
            </Modal>
        </div>
    )
}