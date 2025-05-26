import config from '../config/config'
import { User, initUsermodel } from './user';
import { Sequelize, Dialect } from 'sequelize';
import dotenv from 'dotenv'
import { Subject,subjectInitModel} from './subject';
dotenv.config()
export interface DB {
  sequelize: Sequelize,
  User: typeof User,
  Subject:typeof Subject
}
const env = process.env.NODE_ENV || "development";
const configdata = config['development']
const sequelize: Sequelize = new Sequelize({
  username: configdata.username as string,
  password: configdata.password,
  database: configdata.database as string,
  host: configdata.host as string,
  dialect: configdata.dialect as Dialect
}
)
sequelize.sync({force:false})
const Usermodel = initUsermodel(sequelize)
const Subjectmodel=subjectInitModel(sequelize)
const db: DB = {
  sequelize,
  User: Usermodel,
  Subject:Subjectmodel
}
Usermodel.associate?.(db)
Subjectmodel.associate?.(db)
export default db