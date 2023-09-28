import express from 'express';
import bodyParser from 'body-parser';
import { getUsers } from '../controllers/data-controller.js';
import { assign, removeTask } from '../controllers/user-controller.js';

const router = express.Router();
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: false, limit: 100000, parameterLimit: 6}));

router.get('/', getUsers)
router.put('/assign', assign)
router.delete('/removeTask', removeTask);

export default router;