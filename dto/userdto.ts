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