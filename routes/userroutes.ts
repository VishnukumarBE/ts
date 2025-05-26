import express from 'express'
import { createUser, getUsers, updateuser, deleteuser, getuserbyid,getusersbysubject,exportstudent } from '../controller/usercontroller'
const app = express.Router()
app.post('/', createUser)
app.get('/', getUsers)
app.get('/exportstudent',exportstudent)
app.get('/subjectbyuser/:id',getusersbysubject)
app.put('/:id', updateuser)
app.delete('/:id', deleteuser)
app.get('/:id', getuserbyid)
export default app