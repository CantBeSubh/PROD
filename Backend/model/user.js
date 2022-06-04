const mongoose=require('mongoose')
const validate = require('mongoose-validator')
const {Schema,model}=mongoose

const nameValidator = [
    validate({
      validator: 'isLength',
      arguments: [3, 50],
      message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
    }),
    {
        validator: (v)=> {
          return /([a-zA-Z]* *)*/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      }
]

const usernameValidator=[
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
    })
]

const emailValidator=[
    validate({
        validator:'isEmail',
        message:'Enter valid email'
    })
]

const pwdValidator=[
    validate({
        validator:'isHash',
        arguments:'md5',
        message:'Password is not in md5'
    })
]

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