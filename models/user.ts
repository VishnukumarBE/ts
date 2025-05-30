
import {  Model,DataTypes,Optional, Sequelize } from 'sequelize'
import { UserAttributes } from '../dto/userdto';
import {DB} from './index'
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
export class User extends Model<UserAttributes,UserCreationAttributes> implements UserAttributes{
    public id?:number;
    public name! :string;
    public age!:number;
    public subjectId!: number;
    public createdAt?:Date;
    public updatedAt?:Date;
    static associate(models:DB){
        this.belongsTo(models.Subject,{foreignKey:'subjectId'})
    }
}
export function initUsermodel(sequelize:Sequelize):typeof User{
   User.init({
    id:{
       type:DataTypes.INTEGER.UNSIGNED,
       primaryKey:true,
       autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    age:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    subjectId:{
        type:DataTypes.INTEGER,
        references:{
            model:"tssubject",
            key:'id'
        }
    }}
    ,{
        sequelize,
        tableName:'tsuser'
    }
    
)
return User;
}
