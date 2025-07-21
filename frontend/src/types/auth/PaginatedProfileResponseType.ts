import type { PaginatedResponse } from "../PaginatedResponse"


export type ProfileType = {
    id: number,
    user: number,
    username: string,
    about: string,
    bio: string,
    author:boolean,
    email: string,
    full_name: string | null,
    date: string,
    country: string,
    image: string | null,
    twitter: string | null,
    facebook: string | null,
}

export type PaginatedProfileResponseType = PaginatedResponse<ProfileType>