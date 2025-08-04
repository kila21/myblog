import { useState } from "react"
import { useAppSelector } from "../../store/hooks"

import { Bookmark } from "lucide-react"

import { useTogglePostBookmarkMutation } from "../../store/posts/postsService"
import { Modal } from "../modals/Modal"
import { UserListModal } from "../modals/UserListModal"

export const ToggleBookmark = (props: {slug: string, bookmarked: boolean, count: number}) => {
    const authState = useAppSelector((state) => state.auth)
    const [ togglePostBookmark ] = useTogglePostBookmarkMutation()

    const [isModalOpen, setIsModalOpen ] = useState(false)

    const handleToggleBookmark = async () => {
        if (authState.user) {
            try {
                await togglePostBookmark(props.slug).unwrap()
            } catch (err) {
                alert('Toggle Bookmark Wont Work, Please Try Again!.' + err)
            }
        } else {
            alert('You Need to Login!')
        }
    }


    return (
        <div className="flex gap-2">
            <Bookmark 
            className="cursor-pointer" 
            color={(authState.user && props.bookmarked)? 'red' : 'grey'}
            onClick={handleToggleBookmark}
            />
            <span onClick={() => setIsModalOpen(true)}>{props.count}</span>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Bookmarked by">
                <UserListModal slug={props.slug} type='bookmarks'/>
            </Modal>
        </div>
    )
}