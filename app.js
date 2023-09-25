import express from 'express';
import bodyParser from 'body-parser';
import { 
    deleteTasks, getTasks, editTasksName, editTasksDesc, createTask 
} from './controllers/data-controller.js';

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false, limit: 100000, parameterLimit: 6}));
app.use(express.static('public'));

app.get('/', getTasks)
app.post('/', createTask)
app.put('/name/:id', editTasksName);
app.put('/desc/:id', editTasksDesc);
app.delete('/:id', deleteTasks);

app.listen(5000)