import express, { Application } from 'express'
import userrouter from './routes/userroutes'
import subjectrouter from './routes/subjectroutes'
import emailrouter from './routes/emailroutes'
import dotenv from 'dotenv'
import YAML from 'yamljs'
import swaggerUi from 'swagger-ui-express'
const swaggerDocument=YAML.load('./swagger/user.yaml')
dotenv.config()
const app:Application=express()
app.use(express.json())
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument))
app.use('/user',userrouter)
app.use('/subject',subjectrouter)
app.use('/email',emailrouter)
const port:number=parseInt(process.env.PORT as string)
if(!port) throw new Error('port number unavailable')
app.listen(port,'localhost',():void=>{
 console.log(`connected to http://localhost:${port}`)
})