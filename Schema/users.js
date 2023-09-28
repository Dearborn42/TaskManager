import mongoose from "mongoose";
const { Schema } = mongoose;

const user_account = new Schema({
    "name": {
        type: String,
        validate:{validator: (value)=>{return typeof value === "string"}},
        required: true
    },
    "email": {
        type: String,
        validate:{validator: (value)=>{
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return typeof value === "string" && emailRegex.test(value)
        }},
        required: true
    },
    "password": {
        type: String,
        validate:{validator: (value)=>{return typeof value === "string"}},
        required: true
    },
    "id":{
        type: Number,
        validate:{validator: (value)=>{return typeof value === "number"}},
    },
    "age":{
        type: Number,
        validate:{validator: (value)=>{return typeof value === "number"}},
    },
    "tasks":{
        type: Array,
        default: ""
    }
}, { collection: 'users'})

const user = mongoose.model('user', user_account);
export default user