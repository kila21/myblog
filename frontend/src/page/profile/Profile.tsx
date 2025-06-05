import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUserData } from "../../services/authService"
import type { ProfileResponseType } from "../../types/auth/ProfileResponse"
import { Facebook, Twitter } from "lucide-react"
import { formatDate } from "../../utils/date"
import { ProfilePosts } from "./ProfilePosts"


export const Profile = () => {
    const params = useParams()

    const [profileData, setProfileData] = useState<ProfileResponseType>()

    const fetchUser = async (username: string) => {
        try {
            const response = await getUserData(username)
            setProfileData(response.data)
        }catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchUser(params.username!)
    }, [])


    return (
        <div className="px-4 flex flex-col">
            <main className="w-full flex flex-col md:flex-row md:justify-between">
                {/* user image, bio  */}
                <div className="w-full md:w-1/2 flex flex-col items-center gap-2">
                    <div className='w-50 h-50 rounded-full overflow-hidden border border-grey-300 shadow-sm'>
                        <img className='w-full h-full object-cover bg-white' src='' alt=''/>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-bold text-lg">@{profileData?.username}</p>
                        {/* <p className='text-bold text-email'></p> */}
                        {profileData?.full_name && <p className="text-lightgrey">{profileData.full_name}</p>}
                        <address className="text-lightgrey">{profileData?.email}</address>
                    </div>
                </div>

                {/* soc links */}
                <div className="flex flex-col w-full items-center gap-3 my-5">
                    <h3>Social Links: </h3>
                    {profileData?.twitter === null && profileData?.facebook === null && <p className="text-lightgrey italic text-center">Author Have No Connected Social Links!</p> }

                    {/* //check if facebook or twitter exissts */}
                    {profileData?.facebook 
                    && 
                    <a href={profileData.facebook}> <Facebook /></a>}
                    
                    {profileData?.twitter 
                    && 
                    <a href={profileData?.twitter}>
                        <Twitter />
                    </a>
                    }

                    <p>
                        Joined: <span>{profileData?.date && formatDate(profileData?.date)}</span>
                    </p>
                    {/* // bio */}
                    {profileData?.bio && 
                        <div className="flex flex-col items-center gap-3 min-h-10 w-60 md:w-100 border-b-1 border-lightgrey rounded-md pb-5">
                            <h2 className="text-white text-sm">bio</h2>
                            <p className="text-sm text-lightgrey">
                                "${profileData?.bio}"
                            </p>
                        </div>
                    }
                </div>
            </main>

            {profileData && <section className="w-full px-10 mt-5">
                    <ProfilePosts username={profileData?.username}/>
            </section>}
        </div>
    )
}