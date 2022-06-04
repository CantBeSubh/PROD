const validate = require('mongoose-validator')

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
        message: props => `${props.value} is not a valid name`
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

module.exports ={
    emailValidator,
    nameValidator,
    pwdValidator,
    usernameValidator
}