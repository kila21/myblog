import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "../../constants/api";
import type { PostResponseType } from "../../types/post/PostResponse";



export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({baseUrl: `${API_BASE_URL}`}),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getPosts: builder.query<PostResponseType[], void>({
            query: () => 'api/posts'
        })
    })
})

export const { useGetPostsQuery } = postsApi;