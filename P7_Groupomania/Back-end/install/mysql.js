const db = require('../config/db')
const fs = require('fs')
global.mysqlInstallState = 'wait' //wait,success,error

const install = function(){
    console.log(`
    ====================================
            START MYSQL INSTALL
    ====================================
    `)

    const sql = fs.readFileSync(__dirname + '/groupomania.sql', 'utf8')

    db.query(sql, function(err, result, fields){
        if(err) {
            global.mysqlInstallState = 'error'
            console.log(`
            ====================================
                    MYSQL INSTALL ERROR
            ====================================
            `)
            console.log(err)
        }
        else{
            global.mysqlInstallState = 'success'
            console.log(`
            ====================================
                    MYSQL INSTALL SUCCESS!
            ====================================
            `)
        }
    })
}

const middleware = function(req, res, next){
    switch(global.mysqlInstallState){
        case 'wait':
            const interval = setInterval(function(){
                if(global.mysqlInstallState == 'success' || global.mysqlInstallState == 'error'){
                    clearInterval(interval)

                    if(global.mysqlInstallState == 'error'){
                        res.status(410).json({'error': 'mysql error'})
                    }
                    else{
                        next()
                    }
                }
            }, 1000)
            break

        case 'success':
            next()
            break

            
        case 'error':
            res.status(410).json({'error': 'mysql error'})
            break
    }
}

module.exports = {
    middleware,
    install
}