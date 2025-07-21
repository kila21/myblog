import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "../../constants/api";

import type { ProfileType } from "../../types/auth/PaginatedProfileResponseType";
import type { PaginatedPostResponseType } from "../../types/post/PaginatedPostResponseType";

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({baseUrl: API_BASE_URL}),
    tagTypes: ['UserProfile', 'UserPosts', 'AuthenticatedUser'],
    endpoints: (builder) => ({
        getAuthenticatedUserProfile: builder.query<ProfileType, string>({
            query: (username: string) => `/users/profile/${username}/`,
            providesTags: (_result, _err, username) => [{type: 'AuthenticatedUser', id: username}]
        }),

        getUserProfile: builder.query<ProfileType, string>({
            query: (username: string) => `/users/profile/${username}/`,
            providesTags: (_result, _err, username) => [{type: 'UserProfile', id: username}]
        }),

        getUserPosts: builder.query<PaginatedPostResponseType, string>({
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