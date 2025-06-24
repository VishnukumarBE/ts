import { EmailAttributes,sendEmail } from '../dto/userdto'
import db from '../models/index'
import transport from '../services/mail'
import dotenv from 'dotenv'
dotenv.config()
const {Email}=db
import { Request,Response } from 'express'
const populatemail=async(req:Request,res:Response)=>{
       try{
        const {type,subject,content}=req.body as EmailAttributes
       await Email.create({type,subject,content})
       res.status(201).json('Email Template created')
       }
       catch(err:any){
        res.status(500).json(err.message)
       }
}
const sendmail=async(req:Request,res:Response)=>{
       try{
              const data:sendEmail=req.body
              const mailTemplate:EmailAttributes|null=await Email.findOne({where:{type:data.type},attributes:['type','subject','content']})
              if(!mailTemplate){
                     res.status(400).json('provide a valid template')
                     return
              }
              let htmlcontent;
              if(mailTemplate.type=='Welcome'){
                      htmlcontent=mailTemplate.content.replace('{{name}}',data.name)
              }
              if(mailTemplate.type=='ResetPassword'){
                     const resetLink = 'https://example.com/reset-password?token=123abcDEF456'
                     htmlcontent = mailTemplate.content.replace('{{link}}', resetLink);
              }
              if(mailTemplate.type=='Invoice'){
                       htmlcontent=mailTemplate.content
              }
              console.log(htmlcontent)
             await transport.sendMail({
                    from : process.env.MAIL,
                    to : data.to,
                    subject:mailTemplate.subject,
                    html:htmlcontent
             })
            res.status(200).json('mail sent')
              }catch(err:any){
                     res.status(500).json(err.message)
              }
       }
export {populatemail,sendmail}