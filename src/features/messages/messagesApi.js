import { apiSlice } from "../api/apiSlice";
import { io } from "socket.io-client";

export const messagesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (id) =>
        `/messages?conversationId_like=${id}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_MESSAGES_PER_PAGE}`,

      // socket on and update cache
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        // create socket
        const socket = io(process.env.REACT_APP_API_URL, {
          reconnectionDelay: 1000,
          reconnection: true,
          reconnectionAttempts: 10,
          transports: ["websocket"],
          agent: false,
          upgrade: false,
          rejectUnauthorized: false,
        });
        try {
          await cacheDataLoaded;
          socket.on("message", (data) => {
            updateCachedData((draft) => {
              // eslint-disable-next-line eqeqeq
              const message = draft.find((c) => c.conversationId == data?.data?.conversationId);

              if (message?.conversationId) {
                draft.push(data?.data);
              }
            });
          });
        } catch (err) {
          // console.log(err);
        }

        await cacheEntryRemoved;
        socket.close();
      },
    }),

    addMessage: builder.mutation({
      query: (data) => ({
        url: "/messages",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;
