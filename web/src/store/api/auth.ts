import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./queries";
import { setUser } from "store/auth";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: axiosBaseQuery({
		baseUrl: import.meta.env.VITE_APP_BASE_URL as string,
	}),
	endpoints: (builder) => ({
		registerUser: builder.mutation({
			query: (data: any) => ({
				url: "/account/signup/",
				method: "post",
				data,
			}),
		}),
		loginUser: builder.mutation({
			query: (data: any) => ({
				url: "/account/login/",
				method: "post",
				data,
			}),
		}),
		loadUser: builder.query({
			query: () => ({
				url: "/account/user/",
				method: "get",
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				console.log(arg);

				try {
					const { data } = await queryFulfilled;
					dispatch(setUser(data));
				} catch (error) {
					console.error("Failed to fetch data:", error);
				}
			},
		}),
	}),
});

export const {
	useRegisterUserMutation,
	useLoginUserMutation,
	useLazyLoadUserQuery,
} = authApi;
