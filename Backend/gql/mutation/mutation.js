const graphql=require('graphql')
const User=require('../../model/user')
const Habit=require('../../model/habit')
const HabitType = require('../type/habitType')
const UserType=require('../type/userType')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
    GraphQLInt
}=graphql

const Mutation=new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addUser:{
            type:UserType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                username:{type:new GraphQLNonNull(GraphQLString)},
                email:{type:new GraphQLNonNull(GraphQLString)},
                password:{type:new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
                let user=new User({
                    name:args.name,
                    username:args.username,
                    email:args.email,
                    password:args.password
                })
                return user.save()
            }
        },
        addHabit:{
            type:HabitType,
            args:{
                uid:{type:new GraphQLNonNull(GraphQLString)},
                name:{type:new GraphQLNonNull(GraphQLString)},
                up:{type:GraphQLInt},
                down:{type:GraphQLInt}
            },
            resolve(parent,args){
                let habit=new Habit({
                    uid:args.uid,
                    name:args.name,
                    up:args.up,
                    down:args.down
                })
                return habit.save()
            }
        }
    }
})

module.exports=Mutation