import type { AxiosResponse } from "axios"

import api from "./axios"
import type { PostResponseType } from "../types/post/postResponse"

// for home pages. now get all post, later shoud be top.
export const getTopPosts = (): Promise<AxiosResponse<PostResponseType[]>> => {
    return api.get('/api/posts/')
}