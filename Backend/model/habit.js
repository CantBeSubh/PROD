const mongoose=require('mongoose')
const {Schema,model}=mongoose

const {nameValidator}=require('../utils/validators')

const habitSchema= new Schema({
    uid:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
        validate:nameValidator
    },
    up:{
        type:Number,
        default:0
    },
    down:{
        type:Number,
        default:0
    }
})

module.exports=model('Habit',habitSchema)