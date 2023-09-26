import randomTasks from "../data.js";
import path from 'path';
import { fileURLToPath } from 'url'; 
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import task from "../Schema/tasks.js"
dotenv.config();
mongoose.connect(process.env.MONGO)

export async function getTasks(req, res){
    const tasks = await task.find({}).then((docs, err) => {
        if (err)
            console.error(err);
        else
           res.status(202).render(path.join(__dirname, "../public/interface.ejs"), {tasks: docs});
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
        const newID = Math.max(...id);
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
//     for(let i=0; i<randomTasks.length; i++){
//         const insert = new task(randomTasks[i])
//         await insert.validate();
//         await insert.save();
//     }
// }

// await insertData();