import express from 'express';
import bodyParser from 'body-parser';
import { getUsers } from '../controllers/data-controller.js';
import { assign, removeTask, deleteUser, createUser, getEditPage, editUser } from '../controllers/user-controller.js';
import path from 'path';
import { fileURLToPath } from 'url'; 

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const router = express.Router();
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: false, limit: 100000, parameterLimit: 6}));

router.get('/', getUsers);
router.put('/assign', assign);
router.get('/create', (req, res) => {
    const {token} = req.query;
    res.status(202).render(path.join(__dirname, '../public/create.ejs'), {token: token});
})
router.get('/edit/:email',getEditPage);
router.post('/edit/:email',editUser)
router.post('/create', createUser);
router.delete('/removeTask', removeTask);
router.delete('/deleteUser', deleteUser);
export default router;