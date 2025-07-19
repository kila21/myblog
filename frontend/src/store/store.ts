import { configureStore } from "@reduxjs/toolkit";

import authReducer from './auth/authSlice'
import { postsApi } from "./posts/postsService";
import { profileApi } from "./profile/profileService";


export const store = configureStore({
    reducer: {
        'auth': authReducer,
        [postsApi.reducerPath]: postsApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(postsApi.middleware, profileApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store