import { Sequelize,Model,Optional, DataTypes} from "sequelize";
import { EmailAttributes,EmailEnum } from "../dto/userdto";
 export class Email extends Model<EmailAttributes> implements EmailAttributes{
        public type!:string
        public content!:string
        public cc!:string
        public subject!: string;
}
export function emailInitModel(sequelize:Sequelize):typeof Email{
  Email.init({
       id:{
         type:DataTypes.INTEGER,
         allowNull:false,
         primaryKey:true,
         autoIncrement:true
      },
      type:{
        type:DataTypes.ENUM(...Object.values(EmailEnum)),
        allowNull:false
      },
      subject:{
        type:DataTypes.STRING,
        allowNull:false
      },
      content:{
      type:DataTypes.TEXT,
       allowNull:false
    }
  },{
    sequelize,
    timestamps:false,
    tableName:'Email'
  })

    return Email
}