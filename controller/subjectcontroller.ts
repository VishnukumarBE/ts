import { SubjectAttributes } from "../dto/userdto";
import {Request,Response} from 'express'
import { Subject } from "../models/subject";
const createsubject=async(req:Request,res:Response)=>{
      try{
        const {name}:SubjectAttributes=req.body
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
export {createsubject,getsubjects}