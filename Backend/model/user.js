const mongoose=require('mongoose')
const {Schema,model}=mongoose

const {
    emailValidator,
    nameValidator,
    pwdValidator,
    usernameValidator
}=require('../utils/validators')

const userSchema=new Schema({
    name:{
        type:String,
        validate:nameValidator,
        required:[true,'First Name is required']
    },
    email:{
        type:String,
        unique:[true,'E-Mail already in use.Try logging in'],
        validate:emailValidator
    },
    username:{
        type:String,
        unique:[true,'username already in use'],
        validate:usernameValidator
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        validate:pwdValidator
    }
})

module.exports=model('User',userSchema)