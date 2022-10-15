import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import conversatonSliceReducer from "../features/conversations/conversationsSlice";
import messagesSliceReducer from "../features/messages/messagesSlice";
import collapsedSliceReducer from "../features/collapsed/collapsedSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    collapsed: collapsedSliceReducer,
    conversations: conversatonSliceReducer,
    messages: messagesSliceReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(apiSlice.middleware),
});
