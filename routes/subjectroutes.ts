import express from 'express'
import { createsubject, getsubjects, } from '../controller/subjectcontroller'
const app=express.Router()
app.get('/getsubject',getsubjects)
app.post('/subject',createsubject)
export default app