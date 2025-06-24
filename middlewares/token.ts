import db from '../models/index'
import {Op} from 'sequelize'
const {User}=db
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import {Request,Response,NextFunction } from 'express'
import {IdNameValidator} from '../dto/userdto'
import {customrequest} from '../dto/userdto'
dotenv.config()

async function validateNameandId(req:customrequest,res:Response,next:NextFunction){
    try{
        const reqdata=req.body as IdNameValidator
    const user=await User.findOne(
       {
        where:{
         [Op.and]:[
            {name:reqdata.name},
            {id:reqdata.id}
        ]
       }
       }
    )
    const key=process.env.SECRETKEY
    if(!user||!key) {
        res.end('Middleware Error Provide Correct id and name')
        return
    }
    const token=jwt.sign({id:reqdata.id,name:reqdata.name},key,{
        expiresIn:'1m'
    })
    req.data=token 
    next()
    }catch(err:any){
        res.status(500).json({message:err.message})
    }
}
export default validateNameandId