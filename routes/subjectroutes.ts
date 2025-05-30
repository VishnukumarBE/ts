import express from 'express'
import { createsubject, getsubjects,htmltopdf } from '../controller/subjectcontroller'
import htmlUpload from '../middlewares/htmlupload'
const app=express.Router()
app.get('/getsubject',getsubjects)
app.post('/subject',createsubject)
app.post('/htmltopdf',htmlUpload.single('file'),htmltopdf)
export default app