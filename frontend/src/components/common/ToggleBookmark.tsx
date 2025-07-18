import { useState } from "react"
import { Bookmark } from "lucide-react"

import { useAppSelector } from "../../store/hooks"

import { useTogglePostBookmarkMutation } from "../../store/posts/postsService"

export const ToggleBookmark = (props: {slug: string, bookmarked: boolean, count: number}) => {
    const authState = useAppSelector((state) => state.auth)

    const [ togglePostBookmark ] = useTogglePostBookmarkMutation()
    
    const [bookmarkData, setBookmarkData] = useState<{bookmarked: boolean, bookmarksCount: number}>({bookmarked: props.bookmarked, bookmarksCount: props.count})

    const handleToggleBookmark = async () => {
        if (authState.user) {
            try {
                const response = await togglePostBookmark(props.slug).unwrap()

                if(response.bookmarked.includes('Removed')) {
                    setBookmarkData(prev => ({bookmarked: false, bookmarksCount: prev.bookmarksCount - 1}))
                }else {
                    setBookmarkData(prev => ({bookmarked: true, bookmarksCount: prev.bookmarksCount + 1}))
                }
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
            color={(authState.user && bookmarkData.bookmarked)? 'red' : 'grey'}
            onClick={handleToggleBookmark}
            />
            <span>{bookmarkData.bookmarksCount}</span>
        </div>
    )
}