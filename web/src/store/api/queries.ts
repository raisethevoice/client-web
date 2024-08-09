import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError, AxiosRequestConfig } from "axios";
import axios from "axios";
import storage from "utils/storage";

const coreAxios = axios.create();

coreAxios.interceptors.request.use((req) => {
	const accessToken = storage.get("access_token");

	if (accessToken) {
		req.headers.authorization = `Token ${accessToken}`;
	}

	return req;
});

coreAxios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response.status === 401) {
			storage.remove("access_token");
		}
		return Promise.reject(error);
	}
);

const axiosBaseQuery =
	(
		{ baseUrl } = { baseUrl: import.meta.env.VITE_APP_BASE_URL }
	): BaseQueryFn<
		{
			url: string;
			method: AxiosRequestConfig["method"];
			data?: AxiosRequestConfig["data"];
			params?: AxiosRequestConfig["params"];
			headers?: AxiosRequestConfig["headers"];
		},
		unknown,
		unknown
	> =>
	async ({ url, method, data, params, headers }) => {
		try {
			const result = await coreAxios({
				url: baseUrl + url,
				method,
				data,
				params,
				headers,
			});
			return { data: result.data };
		} catch (axiosError) {
			const err = axiosError as AxiosError;
			return {
				error: {
					status: err?.response?.status,
					data: err?.response?.data || err.message,
				},
			};
		}
	};

export default axiosBaseQuery;
