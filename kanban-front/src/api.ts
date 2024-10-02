import axios from 'axios';
const API_URL = 'http://localhost:3000/';

export const fetchTasks = () => axios.get(API_URL);
export const createTask = (task: { title: string; description: string }) => axios.post(API_URL, task);

export const updateTask = (
    id: number,
    task: { title: string; description: string; status: string }
) => axios.put(`${API_URL}${id}`, task);

export const updateStatus = (
    id: number,
    task: { status: string }
) => axios.put(`${API_URL}status/${id}`, task);


export const deleteTask = (id: number) => axios.delete(`${API_URL}${id}`);
