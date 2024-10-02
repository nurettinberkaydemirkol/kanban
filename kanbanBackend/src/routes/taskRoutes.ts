import { Router } from 'express';
import { getTasks, addTask, modifyTask, removeTask } from '../controllers/taskController';

const router = Router();

router.get('/', getTasks);
router.post('/', addTask);
router.put('/:id', modifyTask);
router.delete('/:id', removeTask);

export default router;
