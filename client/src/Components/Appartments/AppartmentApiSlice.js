import apiSlice from "../../app/apiSlice";

const appartmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    AppartmentList: builder.query({
      query: () => ({
        url: "/appartment/appartmentList",
        method: "GET",
      }),
      providesTags:["products"]
    }),

    getAppById: builder.query({
      query: (id) => ({
        url: `/appartment/${id}`,
        method: "GET",
      }),
    }),

    AddApp: builder.mutation({
      query: (appartment) => ({
        url: "/appartment",
        method: "POST",
        body: appartment,
      }),
      invalidatesTags:["products"],

    }),

    AddComment: builder.mutation({
      query: (comment) => ({
        url: "/appartment/addComment",
        method: "PUT",
        body: comment,
      }),
      invalidatesTags:["products"],

    }),

    DeleteAppartment: builder.mutation({
      query: (id) => ({
        url: `/appartment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:["products"],

    }),

    UpdateAppartment: builder.mutation({
      query: ({ id, appartment }) => ({
        url: `/appartment/update/${id}`,
        method: "PUT",
        body: appartment,
      }),
      invalidatesTags:["products"],
    }),

    AddBooking: builder.mutation({
      query: (booking) => ({
        url: "/appartment/addBook",
        method: "PUT",
        body: booking,
      }),
      invalidatesTags:["products"]
    }),

    checkAvailable: builder.mutation({
      query: (dates) => ({
        url: "/appartment/checkAvailable",
        method: "POST",
        body:dates
      }),
    }),
  }),
});

export const {
  useAppartmentListQuery,
  useGetAppByIdQuery,
  useLazyGetAppByIdQuery,
  useAddAppMutation,
  useAddCommentMutation,
  useDeleteAppartmentMutation,
  useUpdateAppartmentMutation,
  useAddBookingMutation,
  useCheckAvailableMutation,
} = appartmentApiSlice;
