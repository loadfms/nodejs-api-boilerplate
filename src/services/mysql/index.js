const mysqlServer = require('mysql')
const connection = mysqlServer.createConnection({
    hots:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
})

const errorHandler = (error, msg, rejectFunction) =>{
    console.log(error)
    rejectFunction({error: msg})
}

const tasksModule = require('./task/task')({ connection, errorHandler })
const usersModule = require('./user/user')({ connection, errorHandler })
const authModule = require('./auth/auth')({ connection, errorHandler })


module.exports = {
    tasks: () => tasksModule,
    users: () => usersModule,
    auth: () => authModule
}