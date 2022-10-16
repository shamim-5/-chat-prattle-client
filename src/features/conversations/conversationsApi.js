import { apiSlice } from "../api/apiSlice";
import { messagesApi } from "../messages/messagesApi";
import io from "socket.io-client";

export const conversationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: (email) =>
        `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_CONVERSATIONS_PER_PAGE}`,

      transformResponse(apiResponse, meta) {
        const totalCount = meta.response.headers.get("X-Total-Count");

        return {
          data: apiResponse,
          totalCount,
        };
      },

      // socket on and update cache
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        // create socket
        const socket = io(process.env.REACT_APP_API_URL, {
          reconnectionDelay: 1000,
          reconnection: true,
          reconnectionAttemps: 10,
          transports: ["websocket"],
          agent: false,
          upgrade: false,
          rejectUnauthorized: false,
          withCredentials: true,
        });

        try {
          await cacheDataLoaded;
          // updating cache after editing a conversations
          socket.on("conversationEdited", async (data) => {
            await updateCachedData((draft) => {
              const conversation = draft.data.find(
                // eslint-disable-next-line eqeqeq
                (c) => c.id == data?.data?.id
              );

              if (conversation?.id) {
                conversation.message = data?.data?.message;
                conversation.timestamp = data?.data?.timestamp;
              } else {
                // do nothing
              }
            });
          });
          // updating cache after adding a conversations
          socket.on("conversationAdded", async (data) => {
            await updateCachedData((draft) => {
              if (data?.data.participants.includes(arg)) {
                draft?.data?.unshift(data.data);
              }
            });
          });
        } catch (err) {}

        await cacheEntryRemoved;
        socket.close();
      },
    }),
    getMoreConversations: builder.query({
      query: ({ email, page }) =>
        `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=${page}&_limit=${process.env.REACT_APP_CONVERSATIONS_PER_PAGE}`,

      async onQueryStarted({ email }, { queryFulfilled, dispatch }) {
        try {
          const conversations = await queryFulfilled;
          if (conversations?.data?.length > 0) {
            // update conversations cache pessimistically start
            dispatch(
              apiSlice.util.updateQueryData("getConversations", email, (draft) => {
                return {
                  data: [...draft.data, ...conversations.data],
                  totalCount: Number(draft.totalCount),
                };
              })
            );
            // update conversations cache pessimistically end
          }
        } catch (err) {}
      },
    }),
    getConversation: builder.query({
      query: ({ userEmail, participantEmail }) =>
        `/conversations?participants_like=${userEmail}-${participantEmail}&&participants_like=${participantEmail}-${userEmail}`,
      keepUnusedDataFor: 600,
      providesTags: ["Conversation"],
    }),

    addConversation: builder.mutation({
      query: ({ sender, data }) => ({
        url: "/conversations",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Conversation"],

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const conversation = await queryFulfilled;
          if (conversation?.data?.id) {
            // silent entry to message table
            const users = arg.data.users;
            const senderUser = users.find((user) => user.email === arg.sender);
            const receiverUser = users.find((user) => user.email !== arg.sender);

            await dispatch(
              messagesApi.endpoints.addMessage.initiate({
                conversationId: conversation?.data?.id,
                sender: senderUser,
                receiver: receiverUser,
                message: arg.data.message,
                timestamp: arg.data.timestamp,
              })
            );
          }
        } catch (err) {}
      },
    }),
    editConversation: builder.mutation({
      query: ({ id, sender, data }) => ({
        url: `/conversations/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Conversation"],

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const conversation = await queryFulfilled;
          if (conversation?.data?.id) {
            // silent entry to message table
            const users = arg.data.users;
            const senderUser = users.find((user) => user.email === arg.sender);
            const receiverUser = users.find((user) => user.email !== arg.sender);

            await dispatch(
              messagesApi.endpoints.addMessage.initiate({
                conversationId: conversation?.data?.id,
                sender: senderUser,
                receiver: receiverUser,
                message: arg.data.message,
                timestamp: arg.data.timestamp,
              })
            );
          }
        } catch (err) {}
      },
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetConversationQuery,
  useAddConversationMutation,
  useEditConversationMutation,
} = conversationsApi;
