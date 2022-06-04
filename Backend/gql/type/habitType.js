const graphql=require('graphql')
const User = require('../../model/user')
const UserType = require('./userType')
const {
    GraphQLInt,
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
}=graphql

const HabitType=new GraphQLObjectType({
    name:'Habit',
    fields:()=>({
        id:{type:GraphQLID},
        uid:{type:GraphQLString},
        name:{type:GraphQLString},
        up:{type:GraphQLInt},
        down:{type:GraphQLInt},
        user:{
            type:UserType,
            resolve:(parent,args)=>User.findById(parent.uid)
        }
    })
})

module.exports=HabitType