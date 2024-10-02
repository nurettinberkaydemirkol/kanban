import express from 'express';
import taskRoutes from './routes/taskRoutes';
import cors from 'cors';

const app = express();
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', taskRoutes);

export default app;
