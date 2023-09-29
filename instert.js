import path from 'path';
import { fileURLToPath } from 'url'; 
import randomTasks from './data.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import task from './Schema/tasks.js';
import user from "./Schema/users.js";
dotenv.config();
mongoose.connect(process.env.MONGO)

async function insertData(){
    let names = ["John", "Jane", "Joe", "Jasmine", "Jessica"];
    let ages = [ 25, 28, 30, 32, 34];
    let passwords = ["password1", "password2", "password3", "password4", "password5"];
    let emails = ["email1@gmail.com", "email2@gmail.com", "email3@gmail.com", "email4@gmail.com", "email5@gmail.com"];
    let id = 1;
    for(let i=0; i<5; i++){
        const person = new user({
            "name": names[i],
            "age": ages[i],
            "id": id,
            "password": passwords[i],
            "email": emails[i]
        })
        await person.validate();
        await person.save();
        id++;
    }

    for(let i=0; i<randomTasks.length; i++){
        const tasks = new task(randomTasks[i]);
        await tasks.validate();
        await tasks.save();
    }
}

await insertData();