const mongoose=require('mongoose')
const {Schema,model}=mongoose

const timerSchema= new Schema({
    uid:{
        type:String,
        required:true
    },
    name:{
        type:String,
        trim:true
    },
    genre:{
        type:String,
        trim:true
    },
    category:{
        type:String,
        trim:true
    },
    start:{
        type:String,
        required:true
    },
    end:{
        type:String,
        required:true
    }
})

module.exports=model('Timer',timerSchema)