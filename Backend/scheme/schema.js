const graphql=require('graphql')
const User=require('../model/user')

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
        password:{type:GraphQLString}
    })
})


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
    }
})

const Mutation=new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addUser:{
            type:UserType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                username:{type:new GraphQLNonNull(GraphQLString)},
                email:{type:new GraphQLNonNull(GraphQLString)},
                password:{type:new GraphQLNonNull(GraphQLString)},
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
    }
})

module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})