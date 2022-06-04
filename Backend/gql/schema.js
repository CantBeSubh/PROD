const graphql=require('graphql')

const {GraphQLSchema}=graphql

const RootQuery=require('./query/rootQuery')
const Mutation=require("./mutation/mutation")

module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})