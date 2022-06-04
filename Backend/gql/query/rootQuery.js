const graphql=require('graphql')
const UserType=require('../type/userType')
const HabitType=require('../type/habitType')
const User=require('../../model/user')
const Habit=require('../../model/habit')

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
}=graphql

const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        user:{
            type:UserType,
            args:{id:{type:GraphQLID}},
            resolve:(parent,args)=>User.findById(args.id)
        },
        users:{
            type:new GraphQLList(UserType),
            resolve:(parent,args)=>User.find()
        },
        habit:{
            type:HabitType,
            args:{id:{type:GraphQLID}},
            resolve:(parent,args)=>Habit.findById(args.id)
        },
        habits:{
            type:new GraphQLList(HabitType),
            resolve:(parent,args)=>Habit.find()
        }
    }
})

module.exports=RootQuery