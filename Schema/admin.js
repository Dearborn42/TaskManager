import mongoose from "mongoose";
const { Schema } = mongoose;


const adminSchema = new Schema({
    "name": {
        type: String,
        validate:{validator: (value)=>{return typeof value === "string"}},
        required: true,
        trim: true
    },
    "email": {
        type: String,
        trim: true,
        validate:{validator: (value)=>{
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return typeof value === "string" && emailRegex.test(value)
        }},
        required: true
    },
    "password": {
        type: String,
        validate:{validator: (value)=>{return typeof value === "string"}},
        required: true,
        trim: true,
    }
}, { collection: 'admins'})



const admin = mongoose.model('admin', adminSchema);
export default admin