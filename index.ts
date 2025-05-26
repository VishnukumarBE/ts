import express, { Application } from 'express'
import userrouter from './routes/userroutes'
import subjectrouter from './routes/subjectroutes'
import dotenv from 'dotenv'
dotenv.config()
const app:Application=express()
app.use(express.json())
app.use('/user',userrouter)
app.use('/subject',subjectrouter)
const port:number=parseInt(process.env.PORT as string)
if(!port) throw new Error('port number unavailable')
app.listen(port,'localhost',():void=>{
 console.log(`connected to http://localhost:${port}`)
})