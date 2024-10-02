// src/models/taskModel.ts

export interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
}

// Tututlacak datalar
export let tasks: Task[] = [];  
export let idCounter = 0; 

// Tüm görevleri al
export const getAllTasks = () => tasks;

// Yeni görev oluştur
export const createTask = (task: Omit<Task, 'id'>): Task => {
    const newTask: Task = { ...task, id: (++idCounter), status: 'To Do' }; 
    console.log(newTask)
    tasks.push(newTask);
    return newTask;
};

// Görevi güncelle
export const updateTask = (id: string, updatedTask: Partial<Omit<Task, 'id'>>) => {
    console.log(id);
    const taskIndex = tasks.findIndex(task => task.id.toString() === id);
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
        console.log("updated", tasks[taskIndex]);
        return tasks[taskIndex];
    }
    return null;
};

// Görevi sil
export const deleteTask = (id: string) => {
    const taskIndex = tasks.findIndex(task => task.id.toString() === id);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1); 
        return true;
    }
    return false; 
};
