import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { registerApi } from './Slices/registerSlice'
import { avatarApi } from './Slices/avatarSlice'
import { levelApi } from './Slices/levelSlice'

export const store = configureStore({
  reducer: {
    [avatarApi.reducerPath]: avatarApi.reducer,
    [registerApi.reducerPath]: registerApi.reducer,
    [levelApi.reducerPath]: levelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(avatarApi.middleware, registerApi.middleware, levelApi.middleware)

})

setupListeners(store.dispatch)