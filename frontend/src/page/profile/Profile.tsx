import { useParams } from "react-router-dom"

import { Facebook, Twitter } from "lucide-react"
import { formatDate } from "../../utils/date"
import { ProfilePosts } from "./ProfilePosts"
import { ProfilePageSkeleton } from "../../components/skeletons/ProfilePageSkeleton"
import { useGetUserProfileQuery } from "../../store/profile/profileService"


export const Profile = () => {
    const params = useParams()
    const { data, isError, isLoading } = useGetUserProfileQuery(params.username!)

    return (
        <>
            {isLoading && <ProfilePageSkeleton />}
            {isError && <div>Unexpected Error! refresh page or return to Home page </div>}
            {data && (
                <div className="px-4 flex flex-col">
                    <main className="w-full flex flex-col md:flex-row md:justify-between">
                        {/* user image, bio  */}
                        <div className="w-full md:w-1/2 flex flex-col items-center gap-2">
                            <div className='w-50 h-50 rounded-full overflow-hidden border border-grey-300 shadow-sm'>
                                <img className='w-full h-full object-cover bg-white' src={data?.image || '/default-profile.jpg'} alt='user pofile'/>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <p className="text-bold text-lg">@{data?.username}</p>
                                {data?.full_name && <p className="text-lightgrey">{data.full_name}</p>}
                                <address className="text-lightgrey">{data?.email}</address>
                            </div>
                        </div>

                        {/* soc links */}
                        <div className="flex flex-col w-full items-center gap-3 my-5">
                            <h3>Social Links: </h3>
                            {data?.twitter === null && data?.facebook === null && <p className="text-lightgrey italic text-center">Author Have No Connected Social Links!</p> }

                            {/* //check if facebook or twitter exissts */}
                            {data?.facebook 
                            && 
                            <a href={data.facebook}> <Facebook /></a>}
                            
                            {data?.twitter 
                            && 
                            <a href={data?.twitter}>
                                <Twitter />
                            </a>
                            }

                            <p>
                                Joined: <span>{data?.date && formatDate(data?.date)}</span>
                            </p>
                            {/* // bio */}
                            {data?.bio && 
                                <div className="flex flex-col items-center gap-3 min-h-10 w-60 md:w-100 border-b-1 border-lightgrey rounded-md pb-5">
                                    <h2 className="text-white text-sm">bio</h2>
                                    <p className="text-sm text-lightgrey">
                                        "${data?.bio}"
                                    </p>
                                </div>
                            }
                        </div>
                    </main>

                    {/* user posts */}
                    {data && <ProfilePosts username={data?.username}/>}
                </div>
            )}
        </>
    )
}