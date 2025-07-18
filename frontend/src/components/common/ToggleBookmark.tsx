import { Bookmark } from "lucide-react"

import { useAppSelector } from "../../store/hooks"
import { useTogglePostBookmarkMutation } from "../../store/posts/postsService"

export const ToggleBookmark = (props: {slug: string, bookmarked: boolean, count: number}) => {
    const authState = useAppSelector((state) => state.auth)
    const [ togglePostBookmark ] = useTogglePostBookmarkMutation()

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
            <span>{props.count}</span>
        </div>
    )
}