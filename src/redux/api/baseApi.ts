import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://library-management-api-henna.vercel.app/api" }),
    tagTypes: ["book", "borrow"],
    endpoints: (builder) => ({
        // Get all books with filtering, sorting, and limiting
        getBooks: builder.query({
            query: (params) => {
                const queryString = new URLSearchParams(params).toString();
                return `/books?${queryString}`;
            },
            providesTags: ['book']
        }),

        // create a book
        createBook: builder.mutation({
            query: (bookData) => ({
                url: '/books',
                method: 'POST',
                body: bookData
            }),
            invalidatesTags: ['book']
        }),

        // update book
        updateBook: builder.mutation({
            query: ({ bookId, book }) => ({
                url: `/books/${bookId}`,
                method: "PUT",
                body: book,
            }),
            invalidatesTags: ['book'],
        }),

        // delete book
        deleteBook: builder.mutation({
            query: (bookId) => ({
                url: `/books/${bookId}`,
                method: "DELETE",
            }),
            invalidatesTags: ['book']
        }),

        // Borrow a book
        borrowBook: builder.mutation({
            query: (book) => ({
                url: '/borrow',
                method: 'POST',
                body: book
            }),
            invalidatesTags: ['borrow', 'book']
        }),

        // Get all borrow books
        getBorrowSummary: builder.query({
            query: () => ({
                url: '/borrow'
            }),
            providesTags: ['borrow']
        })
    })
})

export const { useGetBooksQuery, useCreateBookMutation, useUpdateBookMutation, useDeleteBookMutation, useBorrowBookMutation, useGetBorrowSummaryQuery } = baseApi;