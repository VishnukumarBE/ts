import { Sequelize,Model, Optional, DataTypes } from "sequelize";
import { DB } from "./index";
import { SubjectAttributes } from "../dto/userdto";
interface optionalsubject extends Optional<SubjectAttributes,'id'|'createdAt'|'updatedAt'>{}
 export class Subject extends Model<SubjectAttributes,optionalsubject> implements SubjectAttributes{
    public id?:number
    public name!:string
    static associate(models:DB){
        this.hasMany(models.User,{foreignKey:'subjectId'})
    }
}
export function subjectInitModel(sequelize:Sequelize):typeof Subject{
    Subject.init({
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:DataTypes.STRING
    },{
        sequelize,
        tableName:'tssubject'
    })
    return Subject
}

