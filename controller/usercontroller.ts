
import { SubjectAttributes, UserAttributes } from '../dto/userdto'
import db from '../models/index'
import { Request, Response } from 'express'
import {Parser} from 'json2csv'
import path from 'path'
import fs from 'fs'
import { customrequest } from '../dto/userdto'
import { UserService } from '../services/userServices'
import cron from 'node-cron'
const userService=new UserService()
const { User } = db
const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, age,subjectId } = req.body as UserAttributes
   const user= await userService.createsUser({name,age,subjectId})
    res.status(201).send({message:'User Created '})
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
    res.status(200).send({message:userList,heart:'❤️'})
  }catch(err:any){
    res.status(500).json({message:err.message })
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
      res.status(200).json(users)
    }catch(err:any){
      res.json(err.message)
    }
}
  const exportstudent=async(req:Request,res:Response):Promise<void>=>{
    try{
      console.log((req as any).user)
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
      res.download(filepath)
    }catch(error:any){
      res.status(500).json(error.message)
    }
  }
  const bulkinsertfromcsv=async(req:Request,res:Response)=>{
  try{
      const userdata = req.body.data;
      console.log(userdata)
      await User.bulkCreate(userdata.data);
      res.json(userdata)
  }catch(err:any){
    res.status(500).json(err.message)
  }
  }
  const getUserByLimits=async(req:Request,res:Response)=>{
    try{
      const page=Number(req.query.page)||1
      const limit=Number(req.query.limit)||3
      const users=await userService.getUsersByPagination(page,limit)
      if(users.rows.length==0){
        res.end('no users found')
      }
      res.status(200).json({Totalpages:Math.ceil(users.count/limit),users:users.rows})
    }catch(err:any){
      res.status(500).json(err.message)
    }
  }
  const generateToken=async(req:customrequest,res:Response)=>{
    try{
        res.status(200).send(req.data)
    }catch(err:any){
          res.status(500).send(err.message)
    }
  }
 cron.schedule('0 0 * * 5', async () => {
  try {
    const users = await userService.getUserList();
    const plainUsers = users.map((user: any) => user.toJSON());
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    const filePath = path.join(uploadDir, 'user.json');
    fs.writeFileSync(filePath, JSON.stringify(plainUsers, null, 2));

    console.log('✅ Weekly user backup successful ');
  } catch (err: any) {
    console.error('❌ Failed to backup users:', err.message);
  }
});
export { createUser, getUsers, updateuser, deleteuser, getuserbyid, getusersbysubject
  ,exportstudent,bulkinsertfromcsv,getUserByLimits,generateToken }