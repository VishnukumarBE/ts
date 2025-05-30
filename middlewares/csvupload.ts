import multer,{FileFilterCallback} from 'multer'
import { NextFunction, Request,Response } from 'express'
import path from 'path'
import readCsv from '../services/csv'

const storage=multer.diskStorage({
    destination:function(req:Request,file:Express.Multer.File,cb){
         cb(null, path.join(__dirname, '../uploads'));
    },
    filename:function(req:Request,file:Express.Multer.File,cb){
        const name=`${Date.now()}-${file.originalname}`
        cb(null,name)
    }
})

const fileFilter=(req:Request,file:Express.Multer.File,cb:FileFilterCallback)=>{
       const allowedtype=/csv/
       const ext=path.extname(file.originalname).toLowerCase()
       if(allowedtype.test(ext)){
        cb(null,true)
       }else{
        cb(new Error('only csv files are allowed'))
       }
}

const csvUpload=multer({storage,fileFilter})
const getcsv=async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
      try{
        if(!req.file){
        res.status(404).json({message:'no files uploaded'})
        return
       }
       const filepath=path.join(__dirname,"../uploads",req.file.filename)
       console.log(filepath)
       const csvdata=await readCsv(filepath)
       req.body.data=csvdata
       console.log(csvdata)
       next()
      }catch(err){
        next(err)
      }
}
export {csvUpload,getcsv}
