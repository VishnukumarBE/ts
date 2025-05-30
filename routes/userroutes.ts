import express from 'express'
import { createUser, getUsers, updateuser, deleteuser, getuserbyid,getusersbysubject,exportstudent,bulkinsertfromcsv} from '../controller/usercontroller'
import readCsv from '../services/csv'
import {csvUpload,getcsv} from '../middlewares/csvupload'
const app = express.Router()
app.post('/bulkinsert',csvUpload.single('file'),getcsv,bulkinsertfromcsv)
app.post('/createuser', createUser)
app.get('/allusers', getUsers)
app.get('/exportstudent',exportstudent)
app.get('/subjectbyuser/:id',getusersbysubject)
app.put('/update/:id', updateuser)
app.delete('/delete/:id', deleteuser)
app.get('/userbyid/:id', getuserbyid)
export default app