const graphql=require('graphql')
const Habit = require('../../model/habit')
const HabitType = require('./habitType')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
}=graphql

const UserType=new GraphQLObjectType({
    name:'User',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        username:{type:GraphQLString},
        email:{type:GraphQLString},
        password:{type:GraphQLString},
        habits:{
            type:new GraphQLList(HabitType),
            resolve:(parent,args)=>Habit.find({uid:parent.id})
        }
    })
})

module.exports=UserType