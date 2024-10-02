import request from 'supertest';
import app from '../app';
import { createTask, getAllTasks, Task, tasks, idCounter } from '../models/taskModel';

describe('Task API', () => {
    beforeEach(() => {
        tasks.length = 0;
        (idCounter as any) = 0; 
    });

    it('should fetch all tasks', async () => {
        // Create some tasks
        createTask({ title: 'Test Task 1', description: 'Test Description 1', status: 'To Do' });
        createTask({ title: 'Test Task 2', description: 'Test Description 2', status: 'To Do' });

        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBe(2);
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('title');
        expect(response.body[0]).toHaveProperty('description');
        expect(response.body[0]).toHaveProperty('status');
    });

    it('should create a new task', async () => {
        const taskData = { title: 'New Task', description: 'New Description', status: 'To Do' };

        const response = await request(app).post('/').send(taskData);
        expect(response.status).toBe(201); 
        expect(response.body).toMatchObject(taskData);
        expect(response.body).toHaveProperty('id');
    });

    it('should update an existing task', async () => {
        const task: Task = createTask({ title: 'Update Me', description: 'Update Me', status: 'To Do' });
        const updatedData = { title: 'Updated Task', description: 'Updated Description', status: 'In Process' };

        const response = await request(app).put(`/${task.id}`).send(updatedData);
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(updatedData);
        expect(response.body.id).toBe(task.id);
    });

    it('should delete a task', async () => {
        const task: Task = createTask({ title: 'Delete Me', description: 'Delete Me', status: 'To Do' });

        const response = await request(app).delete(`/${task.id}`);
        expect(response.status).toBe(204); 
        expect(getAllTasks()).toHaveLength(0); 
    });
});
