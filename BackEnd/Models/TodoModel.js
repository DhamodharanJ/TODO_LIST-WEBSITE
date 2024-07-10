import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    list: {
        type: String,
        required: true
    },
    owner:{
        type:String,
        required : true
    }
}, { timeStamps: true })

const todoModel = mongoose.model('todolist', todoSchema)
export default todoModel