const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const {Schema,model}=mongoose

const {
    emailValidator,
    nameValidator,
    usernameValidator
}=require('../utils/validators')

const userSchema=new Schema({
    name:{
        type:String,
        validate:nameValidator,
        trim:true,
        required:[true,'Name is required']
    },
    email:{
        type:String,
        unique:[true,'E-Mail already in use.Please logging in'],
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
        minlength:8,
        select:false
    },
    photo:{
        type:String,
        default:'https://www.pinpng.com/pngs/m/343-3435180_default-user-profile-image-png-not-available-transparent.png'
    }
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()
    this.password=await bcrypt.hash(this.password,12)
    next()
})
// userSchema.pre('updateOne',async function(next){
//     this.password= await bcrypt.hash(this._update.password,12)
//     next()
// })

// userSchema.methods.compare=async function(pwdGiven,pwdStored){
//     return await bcrypt.compare(pwdGiven,pwdStored)
// }

module.exports=model('User',userSchema)