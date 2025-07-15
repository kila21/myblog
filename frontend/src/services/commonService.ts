import type { AxiosResponse } from "axios"

import api from "./axios"
import type { PostResponseType } from "../types/post/PostResponse"

// for home pages. now get all post, later shoud be top(like filter with tags.).
export const getTopPosts = (): Promise<AxiosResponse<PostResponseType[]>> => {
    return api.get('/api/posts/')
}


// get user all post as list,by user id
export const getUserPosts = (username: string): Promise<AxiosResponse<PostResponseType[]>> => {
    return api.get(`/api/posts/user-posts/${username}/`)
}


// user interactions. (likes, bookmarks comments.)
export const togglePostLike = (slug: string): Promise<AxiosResponse<{likes: string}>> => {
    return api.post(`/api/likes/${slug}/`)
}

export const togglePostBookmark = (slug: string): Promise<AxiosResponse<{bookmarked: string}>> => {
    return api.post(`api/bookmark/${slug}/`)
}