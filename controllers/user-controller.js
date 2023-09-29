import path from 'path';
import { fileURLToPath } from 'url'; 
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import task from "../Schema/tasks.js"
import user from "../Schema/users.js";
import {getUsers} from '../controllers/data-controller.js'
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


export async function deleteUser(req, res){
    try {
        const {email} = req.body;
        const target = await user.findOneAndDelete(
            {"email": email},
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


export async function createUser(req, res){
    try {
        const {token} = req.query;
        const {email, name, password, image} = req.body;
        const count = await user.find({});
        const id = count.map(users => users.id);
        if(id.length > 0){
            var newID = Math.max(...id);
        }else{
            var newID = 0;
        }
        const target = new user({
            name,
            email,
            password,
            id: newID,
            "profile_pic": image
        });
        if(target){
            await target.validate();
            await target.save();
            res.redirect(`/admin?token=${token}`)
        }else
            res.status(404).send({message: "Task/Person not found"});
    } catch (error) {
        res.status(500).send({message: "Server error"});
    }

}


export async function getEditPage(req, res) {
    try {
        const {token} = req.query;
        const {email} = req.params;
        const person = await user.findOne({email: email});
        if(person)
            res.status(202).render(path.join(__dirname, '../public/edit.ejs'), {token: token, user: person, email});
        else
            res.status(404).send({message: "Task/Person not found"});
    } catch (error) {
         res.status(500).send({message: "Server error"});
    }
}


export async function editUser(req, res) {
    try {
        const { token } = req.query;
        const {updateType, value} = req.body;
        const {email} = req.params;
        const update = await user.findOneAndUpdate(
            {email},
            {$set: {[updateType]: value}},
            {new: true}
        );
        if(update)
            res.status(202).redirect(`/admin?token=${token}`)
    } catch (error) {
        
    }
}