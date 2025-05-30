
import { SubjectAttributes, UserAttributes } from '../dto/userdto'
import db from '../models/index'
import { Request, Response } from 'express'
import {Parser} from 'json2csv'
import path from 'path'
import fs from 'fs'
import { UserService } from '../services/userServices'
const userService=new UserService()
const { User } = db
const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, age,subjectId } = req.body as UserAttributes
   const user= await userService.createsUser({name,age,subjectId})
    res.status(201).send({message:'User Created'})
  } catch (err: any) {
    res.json({message:err.message})
  }
}
const getUsers = async (req: Request, res: Response): Promise<void> => {
  try{
    const userList:UserAttributes[]=await userService.getUserList()
    if(userList.length==0){
      res.status(400).json({message:'No Users found'})
      return
    }
    res.status(200).send(userList)
  }catch(err:any){
    res.status(500).json({message:err.message})
  }
}
const updateuser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id)
    const { name, age, subjectId } = req.body as UserAttributes
    const updatedUser=await userService.updatesUser({name,age,subjectId},id)
    if(!updatedUser){
      res.status(404).json({message:'User Not found'})
      return
    }
    res.status(200).send({message:'User updated'})
  } catch (err: any) {
    res.json(err.message)
  }
}
const deleteuser = async (req: Request, res: Response):Promise<void> => {
  try {
    const id = Number(req.params.id)
    const deletedUser= await userService.deleteUser(id)
    if(!deletedUser){
      res.status(404).json({message:'User Not found'})
      return
    }
    res.status(200).send({message:'user deleted'})
  } catch (err:any) {
    res.json(err.message)
  }
}
const getuserbyid = async (req: Request, res: Response): Promise<void> => {

  try {
    const {id}=req.params
    const user:UserAttributes|null=await userService.getUserById(Number(id))
    if(!user){
      res.status(404).json({message:'User Not found'})
      return
    }
    res.status(500).json(user)
  } catch (err: any) {
    res.status(500).json(err.message)
  }
}
  const getusersbysubject=async(req:Request,res:Response):Promise<void>=>{
    try{
      const id=Number(req.params.id)
      const users= await userService.getUsersBySubject(id)
      if(!users){
        res.status(400).json('user or subject id not found')
        return
      }
      users.Users[0].age
      res.status(200).json(users)
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
      res.send("exported")
    }catch(error:any){
      res.status(500).json(error.message)
    }
  }
  const bulkinsertfromcsv=async(req:Request,res:Response)=>{
  try{
      const userdata: UserAttributes[] = req.body.data;
  const cleaneddata = userdata.map((user: UserAttributes) => ({
  ...user,
  age: Number(user.age)
}));
await User.bulkCreate(cleaneddata);
res.json(cleaneddata);
      await User.bulkCreate(userdata)
      res.json(userdata)
  }catch(err:any){
    res.json(err.message)
  }
  }
export { createUser, getUsers, updateuser, deleteuser, getuserbyid, getusersbysubject,exportstudent,bulkinsertfromcsv }