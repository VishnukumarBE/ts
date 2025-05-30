import { SubjectAttributes } from "../dto/userdto";
import {Request,Response} from 'express'
import { Subject } from "../models/subject";
import puppeteer from "puppeteer";
import fs from 'fs'
const createsubject=async(req:Request,res:Response)=>{
      try{
        const {name}=req.body as SubjectAttributes
        const subject:SubjectAttributes=await Subject.create({name})
        res.status(201).json('subject created')
      }catch(err:any){
        res.status(500).json(err.message)
      }
}
const getsubjects=async(req:Request,res:Response)=>{
  try{
       const subjects:SubjectAttributes[]=await Subject.findAll()
       res.status(200).json(subjects)
  }catch(err:any){
       res.status(500).json(err.message)
  }
}
const htmltopdf=async(req:Request,res:Response):Promise<void>=>{
 try{
  if(!req.file){
         res.json('file not provided')
         return
  }
  
  const filepath=req.file.path
  const htmldata:string=fs.readFileSync(filepath,'utf-8')
  console.log(req.file.path)
   const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmldata, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="output.pdf"',
    });
    fs.unlinkSync(filepath)
    const pdffile:string=`${filepath}.pdf`
    fs.writeFileSync(pdffile,pdfBuffer)
    res.end(pdfBuffer);
 }catch(err:any){
  res.status(500).json(err.message)
 }
}
export {createsubject,getsubjects,htmltopdf}