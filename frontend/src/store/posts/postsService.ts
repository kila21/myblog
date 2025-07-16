import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "../../constants/api";
import type { PostResponseType } from "../../types/post/PostResponse";

import type { RootState } from '../store'



export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_BASE_URL}`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getPosts: builder.query<PostResponseType[], void>({
            query: () => 'api/posts/',
            providesTags: ['Post']
        }),
        getPost: builder.query<PostResponseType, string>({
            query: (slug: string) => `api/posts/detail/${slug}`
        }),
    })
})

export const { useGetPostsQuery, useGetPostQuery } = postsApi;