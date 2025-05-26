import dotenv from 'dotenv'
dotenv.config()
const config={
  "development": {
    "username": process.env.USERNAME,
    "password": process.env.PASS,
    "database": process.env.DB,
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
export default config
