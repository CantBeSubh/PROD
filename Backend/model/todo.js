const mongoose=require('mongoose')
const {Schema,model}=mongoose

const {nameValidator}=require('../utils/validators')

const todoSchema= new Schema({
    uid:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
        validate:nameValidator
    },
    check:{
        type:Boolean,
        required:true,
        default:false
    }
})

module.exports=model('Todo',todoSchema)