import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../constants/api";
import type { ProfileResponseType } from "../../types/auth/ProfileResponse";

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({baseUrl: API_BASE_URL}),
    tagTypes: ['UserProfile'],
    endpoints: (builder) => ({
        getUserProfile: builder.query<ProfileResponseType, string>({
            query: (username: string) => `/users/profile/${username}/`,
            providesTags: (_result, _err, username) => [{type: 'UserProfile', id: username}]
        }),
    })
})

export const {
    useGetUserProfileQuery,
} = profileApi