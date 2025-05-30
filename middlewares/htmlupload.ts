import multer,{FileFilterCallback} from 'multer'
import { Request } from 'express'
import path from 'path'

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
       const allowedtype=/html/
       const ext=path.extname(file.originalname).toLowerCase()
       if(allowedtype.test(ext)){
        cb(null,true)
       }else{
        cb(new Error('only html files are allowed'))
       }
}

const htmlUpload=multer({storage,fileFilter})
export default htmlUpload   