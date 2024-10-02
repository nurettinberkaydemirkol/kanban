import { Request, Response } from 'express';
import { createTask, getAllTasks, updateTask, deleteTask } from '../models/taskModel';

// Tüm görevleri al
export const getTasks = (req: Request, res: Response) => {
    const tasks = getAllTasks();
    res.json(tasks);
};

// Yeni görev ekle
export const addTask = (req: Request, res: Response) => {
    console.log(req.body);
    const task = req.body; 
    console.log(task);
    const newTask = createTask(task); 
    res.status(201).json(newTask); 
};

// Görevi güncelle
export const modifyTask = (req: Request, res: Response) => {
    const { id } = req.params; 
    const updatedTask = updateTask(id, req.body);
    if (updatedTask) {
        res.json(updatedTask);
    } else {
        res.status(404).send('Task not found');
    }
};

// Görevi sil
export const removeTask = (req: Request, res: Response) => {
    const { id } = req.params; 
    const success = deleteTask(id); 
    if (success) {
        res.status(204).send();
    } else {
        res.status(404).send('Task not found');
    }
};
