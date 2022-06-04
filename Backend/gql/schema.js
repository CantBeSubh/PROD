//MODULES
const graphql=require('graphql')
const User = require('../model/user')
const Habit = require('../model/habit')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
}=graphql


//TYPES
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


//QUERY
const RootQuery=new GraphQLObjectType({
    name:'RootQuery',
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

//MUTATION
const addUser={
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
}

const addHabit={
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
const delHabit={
    type:HabitType,
    args:{id:{type:GraphQLID}},
    resolve:(parent,args)=>Habit.findByIdAndDelete(args.id)
}

const updateHabit={
    type:HabitType,
    args:{
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        up:{type:GraphQLInt},
        down:{type:GraphQLInt}
    },
    resolve:(parent,args)=>{
        return Habit.findByIdAndUpdate(args.id,{
            name:args.name?parent.name:args.name,
            up:args.up?parent.up:args.up,
            down:args.down?parent.down:args.down
        })
    }
}

const Mutation=new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addUser,
        addHabit,
        delHabit,
        updateHabit
    }
})

module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})