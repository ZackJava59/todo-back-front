export interface Todo {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface NewTodoPayload {
    title: string;
    description?: string;
}

export interface UpdateTodoData {
    title?: string;
    description?: string;
    isCompleted?: boolean;
}

export interface UpdateTodoPayload {
    id: number;
    data: UpdateTodoData;
}