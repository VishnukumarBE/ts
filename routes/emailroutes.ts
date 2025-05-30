import express from 'express'
import {populatemail,sendmail} from '../controller/emailcontroller'
const app=express.Router()
app.post('/createtemplate',populatemail)
app.post('/sendmail',sendmail)
export default app