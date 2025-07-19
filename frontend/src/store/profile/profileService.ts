import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "../../constants/api";

import type { ProfileResponseType } from "../../types/auth/ProfileResponse";
import type { PostResponseType } from "../../types/post/PostResponse";

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({baseUrl: API_BASE_URL}),
    tagTypes: ['UserProfile', 'UserPosts', 'AuthenticatedUser'],
    endpoints: (builder) => ({
        getAuthenticatedUserProfile: builder.query<ProfileResponseType, string>({
            query: (username: string) => `/users/profile/${username}/`,
            providesTags: (_result, _err, username) => [{type: 'AuthenticatedUser', id: username}]
        }),

        getUserProfile: builder.query<ProfileResponseType, string>({
            query: (username: string) => `/users/profile/${username}/`,
            providesTags: (_result, _err, username) => [{type: 'UserProfile', id: username}]
        }),

        getUserPosts: builder.query<PostResponseType[], string>({
            query: (username: string) => `/api/posts/user-posts/${username}/`,
            providesTags: (_result, _err, username) => [{type: 'UserPosts', id: username}]
        })
    })
})

export const {
    useGetAuthenticatedUserProfileQuery,
    useGetUserProfileQuery,
    useGetUserPostsQuery,
} = profileApi