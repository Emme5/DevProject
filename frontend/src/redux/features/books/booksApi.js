import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

const baseQuery = fetchBaseQuery({
	baseUrl: `${getBaseUrl()}/api/books`,
	credentials: "include",
	prepareHeaders: (Headers) => {
		const token = localStorage.getItem("token");
		if (token) {
			Headers.set("Authorization", `Bearer ${token}`);
		}
		return Headers;
	},
});

const booksApi = createApi({
	reducerPath: "booksApi",
	baseQuery,
	tagTypes: ["Books"],
	endpoints: (builder) => ({
		fetchAllBooks: builder.query({
			query: () => "/",
			providesTags: ["Books"],
		}),
		fetchBookById: builder.query({
			query: (id) => `/${id}`,
			providesTags: (result, error, id) => [{ type: "Books", id }],
		}),
		addBook: builder.mutation({
			query: (newBook) => {
				const formData = new FormData();
				for (const key in newBook) {
					formData.append(key, newBook[key]);
				}
				return {
					url: `/create-book`,
					method: "POST",
					body: formData,
				};
			},
			invalidatesTags: ["Books"],
		}),
		updateBook: builder.mutation({
			query: ({ id, ...rest }) => {
				const formData = new FormData();
				for (const key in rest) {
					formData.append(key, rest[key]);
				}
				return {
					url: `/edit/${id}`,
					method: "PUT",
					body: formData,
				};
			},
			invalidatesTags: ["Books"],
		}),
		deleteBook: builder.mutation({
			query: (id) => ({
				url: `/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Books"],
		}),
	}),
});

export const {
	useFetchAllBooksQuery,
	useFetchBookByIdQuery,
	useAddBookMutation,
	useUpdateBookMutation,
	useDeleteBookMutation,
} = booksApi;

export default booksApi;
