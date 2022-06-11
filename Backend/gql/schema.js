//MODULES
const graphql=require('graphql')
const User=require('../model/user')
const Habit=require('../model/habit')
const Todo=require('../model/todo')
const bcrypt=require('bcrypt')

const jwt=require('jsonwebtoken')
const compare= async function(pwdGiven,pwdStored){
    return await bcrypt.compare(pwdGiven,pwdStored)
}
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLBoolean
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
        photo:{type:GraphQLString},
        habits:{
            type:new GraphQLList(HabitType),
            resolve:(parent,args)=>Habit.find({uid:parent.id})
        },
        todos:{
            type:new GraphQLList(TodoType),
            resolve:(parent,args)=>Todo.find({uid:parent.id})
        }
    })
})

const HabitType=new GraphQLObjectType({
    name:'Habit',
    fields:()=>({
        id:{type:GraphQLID},
        uid:{type:GraphQLID},
        name:{type:GraphQLString},
        up:{type:GraphQLInt},
        down:{type:GraphQLInt},
        user:{
            type:UserType,
            resolve:(parent,args)=>User.findById(parent.uid)
        }
    })
})

const TodoType=new GraphQLObjectType({
    name:'Todo',
    fields:()=>({
        id:{type:GraphQLID},
        uid:{type:GraphQLString},
        name:{type:GraphQLString},
        check:{type:GraphQLBoolean},
        user:{
            type:UserType,
            resolve:(parent,args)=>User.findById(parent.uid)
        }
    })
})

const LoginType=new GraphQLObjectType({
    name:'Login',
    fields:()=>({
        id:{type:GraphQLID},
        token:{type:GraphQLString},
        status:{type:GraphQLString}
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
        },
        todo:{
            type:TodoType,
            args:{id:{type:GraphQLID}},
            resolve:(parent,args)=>Todo.findById(args.id)
        },
        todos:{
            type:new GraphQLList(TodoType),
            resolve:(parent,args)=>Todo.find()
        },
        login:{
            type:LoginType,
            args:{
                email:{type:new GraphQLNonNull(GraphQLString)},
                password:{type:new GraphQLNonNull(GraphQLString)}
            },
            resolve:async (parent,args)=>{
                const user= await User.find({email:args.email}).select('+password')
                if(!user[0] || !(await compare(args.password,user[0].password))){
                    return {status:'Not found/Invalid email or password',id:'',token:''}
                }
                const token=jwt.sign({id:user[0].id},process.env.JWT_SECRET,{
                    expiresIn:process.env.JWT_EXP_TIME
                })
                return {status:'Found',id:user[0].id,token}
            }
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

const delUser={
    type:UserType,
    args:{
        id:{type: new GraphQLNonNull(GraphQLID)}
    },
    resolve:(parent,args)=>User.findByIdAndDelete(args.id)
}

const updateUser={
    type:UserType,
    args:{
        id:{type: new GraphQLNonNull(GraphQLID)},
        name:{type:GraphQLString},
        username:{type:GraphQLString},
        email:{type:GraphQLString},
        password:{type:GraphQLString}
    },
    resolve(parent,args){
        return User.updateOne({id:args.id},{
            password:args.password
        })
    }
}

const addHabit={
    type:HabitType,
    args:{
        uid:{type:new GraphQLNonNull(GraphQLID)},
        name:{type:new GraphQLNonNull(GraphQLString)},
    },
    resolve(parent,args){
        let habit=new Habit({
            uid:args.uid,
            name:args.name
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
            name:args.name,
            up:args.up,
            down:args.down
        })
        
    }
}

const addTodo={
    type:TodoType,
    args:{
        uid:{type:new GraphQLNonNull(GraphQLID)},
        name:{type:new GraphQLNonNull(GraphQLString)},
    },
    resolve(parent,args){
        let todo=new Todo({
            uid:args.uid,
            name:args.name,
            check:false
        })

        return todo.save()
    }
}

const delTodo={
    type:TodoType,
    args:{
        id:{type:new GraphQLNonNull(GraphQLID)}
    },
    resolve:(parent,args)=>Todo.findByIdAndDelete(args.id)
}

const updateTodo={
    type:TodoType,
    args:{
        id:{type:new GraphQLNonNull(GraphQLID)},
        name:{type:GraphQLString},
        check:{type:GraphQLBoolean}
    },
    resolve:(parent,args)=>Todo.findByIdAndUpdate(args.id,{
        name:args.name,
        check:args.check
    })
}

const Mutation=new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addUser,
        delUser,
        // updateUser,
        addHabit,
        delHabit,
        updateHabit,
        addTodo,
        delTodo,
        updateTodo
    }
})

module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})