import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/auth';
import { feedApi } from './api/feed';
import { followApi } from './api/follow';
import { userApi } from './api/user';
import prompt from './prompt';
import auth from './auth';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [feedApi.reducerPath]: feedApi.reducer,
    [followApi.reducerPath]: followApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    prompt,
    auth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      feedApi.middleware,
      followApi.middleware,
      userApi.middleware
    ),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
