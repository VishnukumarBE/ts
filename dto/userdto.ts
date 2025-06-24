import { Request } from "express";
export interface UserAttributes {
     id?: number;
     name: string,
     age: number,
     subjectId:number,
     createdAt?: Date;
     updatedAt?: Date;
}

export interface SubjectAttributes{
     id?:number
     name:string,
     createdAt?: Date;
     updatedAt?: Date;
}
export enum EmailEnum{
       Welcome="Welcome",
       Resetpassword='Resetpassword',
       Invoice="Invoice"
}
export interface EmailAttributes{
     id?:number
     type:string,
     subject:string,
     content:string
}
export type sendEmail = {
  type: string;
  to: string;
  name:string
};
export interface UsersBySubject{
     id?:number,
     name:string,
     createdAt?:Date
     updatedAt?:Date
     Users:{
          name:string,
          age:number
     }[]
}
export  interface IdNameValidator{
        id:number,
        name:string
}
export interface customrequest extends Request{
    data?:string
}