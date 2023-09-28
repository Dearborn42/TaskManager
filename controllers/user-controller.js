import path from 'path';
import { fileURLToPath } from 'url'; 
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import task from "../Schema/tasks.js"
import user from "../Schema/users.js";
dotenv.config();
mongoose.connect(process.env.MONGO)

export async function assign(req, res){
    try {
        const {email, tasks} = req.body;
        const assignedTask = await task.findOne({name: tasks}).then(task => {return task});
        const target = await user.findOneAndUpdate(
            {"email": email},
            {$set: {tasks: assignedTask.name}},
            {new: true}
        );
        if(target)
            res.status(202).send({message: "Task updated"});
        else
            res.status(404).send({message: "Task/Person not found"});
    } catch (error) {
        res.status(500).send({message: "Server error"});
    }

}

export async function removeTask(req, res){
    try {
        const {email} = req.body;
        const target = await user.findOneAndUpdate(
            {"email": email},
            {$set: {tasks: ""}},
            {new: true}
        );
        if(target)
            res.status(202).send({message: "Task updated"});
        else
            res.status(404).send({message: "Task/Person not found"});
    } catch (error) {
        res.status(500).send({message: "Server error"});
    }

}



