import path from 'path';
import { fileURLToPath } from 'url'; 
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import task from "../Schema/tasks.js"
import user from "../Schema/users.js";
dotenv.config();
mongoose.connect(process.env.MONGO)

export async function getTasks(req, res){
    const {secret} = req.session
    const user = await task.findOne({"password": secret}).then((docs, err) => {
        if (err)
            console.error(err);
        else
           res.status(202).render(path.join(__dirname, "../public/interface.ejs"), {tasks: docs});
    });
}
export async function getUsers(req, res){
    const tasks = await task.find({}).then((docs, err) => {
        if (err)
            console.error(err);
        else
           return docs;
    });
    const users = await user.find({}).then((docs, err) => {
        if (err)
            console.error(err);
        else
           res.status(202).render(path.join(__dirname, "../public/admin.ejs"), {users: docs, tasks: tasks});
    });
}

export async function editTasksName(req, res){
    const {id} = req.params;
    const {name} = req.body;
    try{
        await task.findOneAndUpdate(
            {id: Number(id)},
            {name: name},
        )
        res.status(200).json({success: true});
    }catch(err){
        res.status(500).json({error: err})
    }
}

export async function editTasksDesc(req, res){
    const {id} = req.params;
    const {desc} = req.body;
    try{
        await task.findOneAndUpdate(
            {id: Number(id)},
            {description: desc},
        )
        res.status(200).json({success: true});
    }catch(err){
        res.status(500).json({error: err})
    }
}

export async function createTask(req, res){
    const {name, desc} = req.body;
    try{
        const count = await task.find({});
        const id = count.map(task => task.id);
        if(id.length > 0){
            var newID = Math.max(...id);
        }else{
            var newID = 0;
        }
        const newTask = await task.create({
            "id": newID + 1,
            name,
            "description": desc
        })
        newTask.save();
        res.status(200).json({success: true});
    }catch(e){
         res.status(500).json({error: e});
    }
}

export async function deleteTasks(req, res){
    const {id} = req.params;
    try{
        await task.findOneAndDelete({id: Number(id)})
        res.status(200).json({success: true});
    }catch(e){
        res.status(500).json({error: e});
    }
}

// async function insertData(){
//     let names = ["John", "Jane", "Joe", "Jasmine", "Jessica"];
//     let ages = [ 25, 28, 30, 32, 34];
//     let passwords = ["password1", "password2", "password3", "password4", "password5"];
//     let emails = ["email1@gmail.com", "email2@gmail.com", "email3@gmail.com", "email4@gmail.com", "email5@gmail.com"];
//     let id = 1;
//     for(let i=0; i<5; i++){
//         const person = new user({
//             "name": names[i],
//             "age": ages[i],
//             "id": id,
//             "password": passwords[i],
//             "email": emails[i]
//         })
//         await person.validate();
//         await person.save();
//         id++;
//     }
// }

// await insertData();