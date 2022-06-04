const express=require("express")
const {graphqlHTTP}=require('express-graphql')
const schema=require('./scheme/schema')
const mongoose=require('mongoose')
const cors=require('cors')
const dotenv=require('dotenv')

dotenv.config('.env')

const db=process.env.DB.replace('<pwd>',process.env.DB_PWD)

const connectToDB=()=>{
    console.time('[+] Connected to Database')
    mongoose
        .connect(db,
        ()=>{console.timeEnd('[+] Connected to Database')})
        .catch((err)=>{console.log('[!] '+err+'\n[-] Disconnecting...');process.exit(1)})
}


const app=express()
const port=process.env.PORT

app
    .use(cors())
    .use('/graphql',graphqlHTTP({schema,graphiql:true}))
    .listen(port,()=>{console.log(`[+] Server stated at port: ${port}`);connectToDB()})