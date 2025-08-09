import { useNavigate } from "react-router-dom"

import { useGetPostBookmarksQuery, useGetPostLikesQuery } from "../../store/posts/postsService"

export const UserListModal = (props: {type: 'likes' | 'bookmarks', slug: string}) => {
    const query = props.type === 'likes'
    ? useGetPostLikesQuery
    : useGetPostBookmarksQuery;

    const { data: users } = query({slug: props.slug!,page: 1}, {
        skip: !props.slug,
    })

    const navigate = useNavigate()
    return (
        <div className="text-white">
            <ul className="w-full flex flex-col gap-5 uppercase text-bold mt-15">
                {
                    users?.results && users.results.map((user) => {
                        return (
                            <li 
                            onClick={() => navigate(`/profile/${user.username}`)}
                            key={user.id} 
                            className="flex items-center gap-2 pb-2 border-b-1 cursor-pointer" >
                                <img
                                    src={user.avatar || "/default-profile.jpg"}
                                    alt={user.username}
                                    className="w-11 h-11 rounded-full"
                                />
                                <span className='ml-10'>{user.username}</span>
                            </li>
                        )
                    })
                }
                {users?.results && users.results.length === 0 &&
                 <div className="text-center">No User Have Interacted yet!</div>}
            </ul>
        </div>
    )
}