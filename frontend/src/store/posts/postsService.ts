import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "../../constants/api";
import type { PaginatedPostResponseType, PostType } from "../../types/post/PaginatedPostResponseType";

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