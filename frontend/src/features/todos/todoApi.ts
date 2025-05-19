import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {NewTodoPayload, Todo, UpdateTodoPayload} from "./types";

const BASE_URL = "http://localhost:9000/api/";

export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        getTodos: builder.query<Todo[], void>({
            query: () => 'todos',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({id}) => ({type: 'Todos' as const, id})),
                        {type: 'Todos', id: 'LIST'},
                    ]
                    : [{type: 'Todos', id: 'LIST'}],
        }),
        getTodoById: builder.query<Todo, number>({
            query: (id) => `todos/${id}`,
            providesTags: (_result, _error, id) => [{type: 'Todos', id}],
        }),
        addTodo: builder.mutation<Todo, NewTodoPayload>({
            query: (newTodo) => ({
                url: 'todos',
                method: 'POST',
                body: newTodo,
            }),
            invalidatesTags: [{type: 'Todos', id: 'LIST'}],
        }),
        updateTodo: builder.mutation<Todo, UpdateTodoPayload>({
            query: ({id, data}) => ({
                url: `todos/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, {id}) => [{type: 'Todos', id}, {type: 'Todos', id: 'LIST'}],
        }),
        deleteTodo: builder.mutation<{ message: string; deletedTodo: Todo }, number>({
            query: (id) => ({
                url: `todos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, id) => [{type: 'Todos', id: id}, {type: 'Todos', id: 'LIST'}],
        }),
        deleteAllTodos: builder.mutation<{ message: string; count: number }, void>({
            query: () => ({
                url: `todos`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: 'Todos', id: 'LIST'}],
        }),
    }),
});

export const {
    useGetTodosQuery,
    useGetTodoByIdQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
    useDeleteAllTodosMutation
} = todoApi;

