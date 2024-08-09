import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth";
import { feedApi } from "./api/feed";
import prompt from "./prompt";
import auth from "./auth";

const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[feedApi.reducerPath]: feedApi.reducer,
		prompt,
		auth,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(authApi.middleware, feedApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
