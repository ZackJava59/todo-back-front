import prisma from "../db.js";
import {Todo} from '@prisma/client';
import {CreateTodoDto, UpdateTodoDto} from "../types/todo.types.js"


export const createTodoService = async (data: CreateTodoDto): Promise<Todo> => {
    try {
        return await prisma.todo.create({
            data: {
                title: data.title,
                description: data.description,
            },
        });
    } catch (err) {
        console.error("Error creating Todo", err);
        throw new Error("Could not create Todo");
    }
};

export const getAllTodosService = async (): Promise<Todo[]> => {
    try {
        return await prisma.todo.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    } catch (err) {
        console.error("Error getting all Todos", err);
        throw new Error("Could not get all Todos");
    }
};

export const getTodoByIdService = async (id: number): Promise<Todo | null> => {
    try {
        return await prisma.todo.findUnique({
            where: {id: id},
        });
    } catch (err) {
        console.error("Error getting Todo", err);
        throw new Error("Could not get Todo");
    }
}

export const updateTodoService = async (id: number, data: UpdateTodoDto): Promise<Todo | null> => {
    const existingTodo = await getTodoByIdService(id);
    if (!existingTodo) {
        return null;
    }
    return prisma.todo.update({
        where: {
            id: id
        },
        data: {
            title: data.title,
            description: data.description,
            isCompleted: data.isCompleted
        },
    })
};

export const deleteTodoService = async (id: number): Promise<Todo | null> => {
    const existingTodo = await getTodoByIdService(id);
    if (!existingTodo) {
        return null;
    }
    await prisma.todo.delete({
        where: {
            id: id
        }
    });
    return existingTodo;
};

export const deleteAllTodosService = async (): Promise<{ count: number }> => {
    const result = await prisma.todo.deleteMany();
    return {count: result.count};
};