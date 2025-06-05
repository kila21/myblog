import type { AxiosResponse } from "axios"

import api from "./axios"
import type { PostResponseType } from "../types/post/PostResponse"

// for home pages. now get all post, later shoud be top(like filter with tags.).
export const getTopPosts = (): Promise<AxiosResponse<PostResponseType[]>> => {
    return api.get('/api/posts/')
}

export const getAllPost = (): Promise<AxiosResponse<PostResponseType[]>> => {
    return api.get('/api/posts/')
}

export const getDetailPost = (slug: string): Promise<AxiosResponse<PostResponseType>> => {
    return api.get(`/api/posts/detail/${slug}/`)
}

// get user all post as list,by user id
export const getUserPosts = (username: string): Promise<AxiosResponse<PostResponseType[]>> => {
    return api.get(`/api/posts/user-posts/${username}/`)
}