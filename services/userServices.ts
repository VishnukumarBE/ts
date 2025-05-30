import { UserAttributes,UsersBySubject } from "../dto/userdto";
import db from "../models/index";
const {User,Subject}=db
export class UserService{
      async getUserList(){
        try{
            const UserList:UserAttributes[]=await User.findAll()
            return UserList
        }catch(err:any){
            throw new Error('UserService has thrown error: '+err.message)
        }
      }
      async createsUser(user:UserAttributes){
           try{
              return await User.create(user)
           }catch(err:any){
             throw new Error('UserService has thrown error: '+err.message)
           }
      }
      async getUserById(id:number){
        try{
          const user= await User.findByPk(id)
          return user
        }catch(err:any){
          throw new Error('User Service has thrown error: '+err.message)
        }
      }
      async updatesUser(userparam:UserAttributes,id:number){
        try{
         const user= await this.getUserById(id)
         if(!user) return 0
         return await user.update(userparam)
        }catch(err:any){
           throw new Error('UserService has thrown error: '+err.message)
        }
      }
      async deleteUser(id:number){
        try{
           const user =await this.getUserById(id)
           if(!user) return 0
           await user.destroy()
           return 1
        }
        catch(err:any){
            throw new Error('UserService has thrown error: '+err.message)
        }
      }
      async getUsersBySubject(id:number){
       try{
        const users= await Subject.findByPk(id,{
        include:[
          {model:User,required:true,attributes:['name','age']}
        ]
      })
       if(!users) return null
       return users.get({plain:true}) as UsersBySubject
       }catch(err:any){
          throw new Error('UserService has thrown error: '+err.message)
       }
      }
}