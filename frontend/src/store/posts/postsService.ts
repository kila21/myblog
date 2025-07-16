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
            query: (slug: string) => `api/posts/detail/${slug}`,
            providesTags: (result, error, slug) => [{type: 'Post', id: slug}]
        }),

        toggleLike: builder.mutation<{likes: string}, string>({
            query: (slug: string) => ({
                url: `api/likes/${slug}/`,
                method: 'POST'
            }),
            invalidatesTags: (result, error, slug) => [{type: 'Post', id: slug}],

            async onQueryStarted(slug, {dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled

                    // get updated post data
                    const updatedPost = await dispatch(
                        postsApi.endpoints.getPost.initiate(slug, { forceRefetch: true })
                    ).unwrap();

                    // update post with slug inside posts data.(getPosts)
                    dispatch(
                        postsApi.util.updateQueryData('getPosts', undefined, (draft) => {
                        const index = draft.findIndex((p) => p.slug === slug);
                            if (index !== -1) {
                                draft[index] = updatedPost
                            }
                        })
                    );
                } catch (err) {
                    console.error('Failed to update post like status:', err);
                }
            }
        })
    })
})

export const { useGetPostsQuery, useGetPostQuery, useToggleLikeMutation, } = postsApi;