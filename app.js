import express from 'express';
import bodyParser from 'body-parser';
// import {  } from './controllers/data-controller.js';
import users from './routes/user-route.js';
import admin from './routes/admin-route.js';
import session from 'express-session';
import {access} from './middleware/access.js';
import { login } from './middleware/login.js';
import path from 'path';
import { fileURLToPath } from 'url'; 

const __dirname = path.dirname(fileURLToPath(import.meta.url));



const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false, limit: 100000, parameterLimit: 6}));
app.use(session({secret: 'place-holder', resave: false, saveUninitialized: true,}));
app.use(express.static('public'));
app.use('/users', access, users);
app.use('/admin', access, admin);

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'));
})
app.post('/', login)


app.listen(5000)