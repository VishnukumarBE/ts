import {Request,Response,NextFunction} from 'express'
import csvSchema from '../schemas/csvSchema'
export function validateCsv(req:Request,res:Response,next:NextFunction){
    
        try{
           const result= csvSchema.safeParse(req.body.data)
            if(!result.success) {
                res.status(400).json({message:'validation error',error:result.error.errors})
            }
            req.body.data=result
            next()
        }catch(err){
            res.status(500).json({message:'Validation Error'})
        }
     
}