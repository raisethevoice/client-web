import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './queries';

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_APP_BASE_URL as string,
  }),
  tagTypes: ['Feed'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({ url: '/feed/', method: 'get' }),
      providesTags: ['Feed'],
    }),
    createPost: builder.mutation({
      query: (data) => ({ url: '/feed/', method: 'post', data }),
      invalidatesTags: ['Feed'],
    }),
    getSinglePost: builder.query({
      query: (id: number) => ({ url: `/feed/${id}`, method: 'get' }),
    }),
    getTrendingPosts: builder.query({
      query: () => ({ url: '/feed/trending/', method: 'get' }),
    }),
    submitVote: builder.mutation({
      query: ({ postId, voteType }) => ({
        url: `/feed/${postId}/vote/${voteType}/`,
        method: 'post',
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useGetSinglePostQuery,
  useGetTrendingPostsQuery,
  useSubmitVoteMutation,
} = feedApi;
