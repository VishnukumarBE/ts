import { Request,Response,NextFunction } from "express"
import { customrequest } from '../dto/userdto'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()
const validateToken=async(req:Request,res:Response,next:NextFunction)=>{

        try{
            if(!req.headers.authorization||!process.env.SECRETKEY){
                res.send({message:'provide a header'})
                return
            }
            const token=req.headers.authorization.split(' ')[1]
            const decoded=jwt.verify(token,process.env.SECRETKEY) as string
            (req as any).user=decoded
            next()
        }catch(err:any){
            res.status(500).json({message:err.message})
        }
}
export default validateToken