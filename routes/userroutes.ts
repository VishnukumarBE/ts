import express from 'express'
import { createUser, getUsers, updateuser, deleteuser, getuserbyid,getusersbysubject,exportstudent,bulkinsertfromcsv,getUserByLimits,generateToken} from '../controller/usercontroller'
import { validateCsv } from '../middlewares/validatecsv'
import {csvUpload,getcsv} from '../middlewares/csvupload'
import tokengenerator from '../middlewares/token'
import validatetoken from '../middlewares/validatetoken'
const app = express.Router()
app.post('/bulkinsert',csvUpload.single('file'),getcsv,validateCsv,bulkinsertfromcsv)
app.get('/getusersbylimit',getUserByLimits)
app.post('/createuser', createUser)
app.get('/allusers', getUsers)
app.get('/exportstudent',validatetoken,exportstudent)
app.get('/subjectbyuser/:id',getusersbysubject)
app.put('/update/:id', updateuser)
app.delete('/delete/:id', deleteuser)
app.get('/userbyid/:id', getuserbyid)
app.post('/generatetoken',tokengenerator,generateToken)
export default app