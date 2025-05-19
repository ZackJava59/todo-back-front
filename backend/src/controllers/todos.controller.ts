import {Request, Response} from 'express';
import * as todoService from '../services/todos.services.js';
import {CreateTodoDto, UpdateTodoDto} from "@/types/todo.types.js";


export const getAllTodosController = async (req: Request, res: Response): Promise<void> => {
    try {
        const todos = await todoService.getAllTodosService();
        res.status(200).json(todos);
    } catch (err) {
        console.error("Error in getAllTodosController", err);
        res.status(500).json({message: 'Failed to fetch todos'});
    }
};

export const getTodoByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({message: 'Invalid id format'});
            return;
        }
        const todo = await todoService.getTodoByIdService(id);
        if (!todo) {
            res.status(400).json({message: "Todo not found"});
        } else {
            res.status(200).json(todo);
        }
    } catch (err) {
        console.error("Error in getTodoByIdController", err);
        res.status(500).json({message: 'Failed to fetch todo'})
    }
};

export const createTodoController = async (req: Request, res: Response): Promise<void> => {
    try {
        const {title, description} = req.body as CreateTodoDto;
        if (!title) {
            res.status(400).json({message: 'Title must be a string'});
            return;
        }
        const newTodo = await todoService.createTodoService({title, description});
        res.status(201).json(newTodo);
    } catch (err) {
        console.error("Error in createTodoController", err)
        res.status(500).json({message: "Failed to create todo"})
    }
}

export const updateTodoController = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({message: 'Invalid id format'});
            return;
        }
        const data = req.body as UpdateTodoDto;
        const updatedTodo = await todoService.updateTodoService(id, data);
        if (!updatedTodo) {
            res.status(404).json({message: 'Todo not found for update'});
        } else {
            res.status(200).json(updatedTodo);
        }
    } catch (err) {
        console.error("Error in UpdateTodoController", err)
        res.status(500).json({message: "Error in updateTodoController"})
    }
}

export const deleteTodoController = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({message: 'Invalid todo id format'});
            return;
        }
        const deletedTodo = await todoService.deleteTodoService(id);
        if (!deletedTodo) {
            res.status(400).json({message: "Todo not found for delete"});
        } else {
            res.status(200).json({message: "Todo deleted successfully", deletedTodo});
        }
    } catch (err) {
        console.error("Error in deleteTodoController", err)
        res.status(500).json({message: "Error in deleteTodoController"})
    }
}

export const deleteAllTodosController = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await todoService.deleteAllTodosService();
        res.status(200).json({message: `Deleted successfully: ${result.count} todos`});
    } catch (err) {
        console.error("Error in deleteAllTodosController", err)
        res.status(500).json({message: "Error in deleteAllTodosController"})
    }
}