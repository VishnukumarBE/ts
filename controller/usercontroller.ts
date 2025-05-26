
import { SubjectAttributes, UserAttributes } from '../dto/userdto'
import db from '../models/index'
import { Request, Response } from 'express'
import { Subject } from '../models/subject'
import {Parser} from 'json2csv'
import path from 'path'
import fs from 'fs'
const { User } = db
const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, age,subjectId } = req.body as UserAttributes
    if (!name || !age || !subjectId) {
      res.json('all fields required')
      return
    }
    const createdUser: UserAttributes = await User.create({ name, age, subjectId })
    createdUser.id
    res.status(201).json('user created')
  } catch (err: any) {
    res.json(err.message)
  }
}
const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const allusers: UserAttributes[] = await User.findAll();
    if (allusers.length > 0) res.json(allusers)
    else res.json('no users found')
  } catch (err: any) {
    res.json(err.message)
  }
}
const updateuser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id)
    const { name, age, subjectId }: UserAttributes = req.body
    if (!name || !age || !subjectId) {
      res.json('all fields required')
      return
    }
    const isvaliduser: UserAttributes | null = await User.findOne({ where: { id: id } })
    if (!isvaliduser) {
      res.status(404).json('user not found')
      return
    }
      await User.update({ name, age, subjectId }, { where: { id:id} })
    res.json('user updated')
  } catch (err: any) {
    res.json(err.message)
  }
}
const deleteuser = async (req: Request, res: Response):Promise<void> => {
  try {
    const id = Number(req.params.id)
    const isvaliduser: UserAttributes | null = await User.findByPk(id)
    if (!isvaliduser) {
      res.status(404).json('no user found')
      return
    }
     await User.destroy({ where: { id: id } })
    res.json('user deleted')
  } catch (err:any) {
    res.json(err.message)
  }
}
const getuserbyid = async (req: Request, res: Response): Promise<void> => {

  try {
    const id = Number(req.params.id)
    const user: UserAttributes | null = await User.findByPk(id)
    if (!user) {
      res.status(404).json('user not available')
    }
    res.status(200).json(user as UserAttributes)
  } catch (err: any) {
    res.status(500).json(err.message)
  }
}
  const getusersbysubject=async(req:Request,res:Response):Promise<void>=>{
    try{
      const id=Number(req.params.id)
      const subject=await Subject.findByPk(id,{
        include:[
          {model:User,required:true,attributes:['name','age']}
        ]
      })
      res.json(subject)
    }catch(err:any){
      res.json(err.message)
    }
  }
  const exportstudent=async(req:Request,res:Response):Promise<void>=>{
    try{
      const users:UserAttributes[]= await User.findAll({raw:true,attributes:['id','name','age']})
      console.log(users)
      const format:string[]=[
        "id","name","age"
      ]
      const parser=new Parser({fields:format})
      const csv:string=parser.parse(users)
      console.log(csv)
      const filepath=path.join(__dirname,'../exports/students.csv')
      fs.writeFileSync(filepath,csv)
      res.download(filepath,'students.csv',(err)=>{
        res.status(500).json(err.message)
      })
    }catch(error:any){
      res.status(500).json(error.message)
    }
  }
export { createUser, getUsers, updateuser, deleteuser, getuserbyid, getusersbysubject,exportstudent }