import mongoose from "mongoose"
const { Schema } = mongoose

const taskSchema = new Schema({
    "name": {
        type: String,
        validate:{validator: (value)=>{return typeof value === "string"}},
        required: true
    },
    "id":{
        type: Number,
        validate:{validator: (value)=>{return typeof value === "number"}},
        required: true
    },
    "description": {
        type: String,
        validate:{validator: (value)=>{return typeof value === "string"}},
        required: true
    }
}, { collection: 'tasks'})


const task = mongoose.model('task', taskSchema);

export default task;