
import fs from 'fs'
import csv from 'csv-parser'
const readCsv=(filepath:string):Promise<string[]>=>{
       return new Promise((resolve,reject)=>{
           const result:string[]=[]
          fs.createReadStream(filepath).pipe(csv()).on('data',(data)=>{
            return result.push(data)
          }).on('end',()=>{
            console.log('csv readed successffully')
            resolve(result)
            console.log(result)
          }).on('error',(error)=>reject(error))
       })
}
export default readCsv