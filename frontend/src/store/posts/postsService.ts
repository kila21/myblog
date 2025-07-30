import { createApi, fetchBaseQuery, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "../../constants/api";
import type { PaginatedPostResponseType, PostType } from "../../types/post/PaginatedPostResponseType";

import type { RootState } from '../store'
import { logout } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: `${API_BASE_URL}`,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
})


const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 401 || result?.error?.status === 403) {
        // Invalid or expired token
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        api.dispatch(logout())
        // request again with no token
        result = await baseQuery(args, api, extraOptions)
    }
    return result
}


export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['TopPost', 'Post', 'BookmarkedPost', 'UserPosts'],
    endpoints: (builder) => ({
        //get all posts for home page
        getTopPosts: builder.query<PaginatedPostResponseType, number | void>({
            query: () => 'api/posts/top/',
            providesTags: ['TopPost'],
        }),
        //get detail post 
        getPost: builder.query<PostType, string>({
            query: (slug: string) => `api/posts/detail/${slug}`,
            providesTags: (_result, _error, slug) => [{type: 'Post', id: slug}],
        }),
        // toggle (like/unlike)
        togglePostLike: builder.mutation<{likes: string}, string>({
            query: (slug: string) => ({
                url: `api/likes/${slug}/`,
                method: 'POST'
            }),
            invalidatesTags: () => [{type: 'TopPost'}, {type: 'BookmarkedPost'}, {type: 'UserPosts'}],
            async onQueryStarted(slug, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;

                    // manually refetch the post, but prevent incrementing views
                    const updatedPost = await dispatch(
                        postsApi.endpoints.getPost.initiate(`${slug}?add_view=false`, {forceRefetch: true})
                    ).unwrap();

                    // update same post inside cached query.
                    dispatch(
                        postsApi.util.updateQueryData('getPost', slug, (draft) => {
                            Object.assign(draft, updatedPost)
                        }),
                    )
                } catch (err) {
                    console.error('Like toggle failed:', err);
                }
            },
        }),

        // toggle (bookmark/unboomark)
        togglePostBookmark: builder.mutation<{bookmarked: string}, string>({
            query: (slug: string) => ({
                url: `api/bookmark/${slug}/`,
                method: 'POST'
            }),
            invalidatesTags: () => [{type: 'TopPost'}, {type: 'BookmarkedPost'}, {type: 'UserPosts'}],
            async onQueryStarted(slug, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;

                    // manually refetch the post, but prevent incrementing views
                    const updatedPost = await dispatch(
                        postsApi.endpoints.getPost.initiate(`${slug}?add_view=false`, {forceRefetch: true})
                    ).unwrap();

                    // update same post inside cached query.
                    dispatch(
                        postsApi.util.updateQueryData('getPost', slug, (draft) => {
                            Object.assign(draft, updatedPost)
                        }),
                    )
                } catch (err) {
                    console.error('Bookmark toggle failed:', err);
                }
            },
        }),
        // get authenticated user bookmarked posts
        getUserBookmarks: builder.query<PaginatedPostResponseType, string>({
            query: (username: string) => `api/bookmark/${username}/all/`,
            providesTags: ['BookmarkedPost']
        }),

        getUserPosts: builder.query<PaginatedPostResponseType, string>({
            query: (username: string) => `/api/posts/user-posts/${username}/`,
            providesTags: ['UserPosts']
        })
    })
})

export const { 
    useGetTopPostsQuery, 
    useGetPostQuery, 
    useTogglePostLikeMutation, 
    useTogglePostBookmarkMutation,
    useGetUserBookmarksQuery,
    useGetUserPostsQuery,
} = postsApi;