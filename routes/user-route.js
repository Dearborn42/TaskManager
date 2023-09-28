import express from 'express';
import bodyParser from 'body-parser';
import { 
    deleteTasks, editTasksName, editTasksDesc, createTask, getTasks 
} from '../controllers/data-controller.js';

const router = express.Router();
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: false, limit: 100000, parameterLimit: 6}));

router.get('/', getTasks)
router.post('/', createTask)
router.put('/name/:id', editTasksName);
router.put('/desc/:id', editTasksDesc);
router.delete('/:id', deleteTasks);


export default router;