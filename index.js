import express from 'express'
import dotenv from 'dotenv'
import asyncHandler from 'express-async-handler'
import mysql from 'mysql'

dotenv.config()
const port = process.env.PORT || 5000

const app = express()

app.use(express.json())

app.use(express.static('public'))

var connection = mysql.createConnection({
    host     : process.env.RDS_HOSTNAME,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD,
    port     : process.env.RDS_PORT,
    database : process.env.RDS_DB
})

connection.connect((err)=>{
    if(err){
        throw err
    }

    console.log("MYSQL_DB connected...")
})



app.post('/api/message', (req,res) => {
   
    let data = [req.body.name,req.body.email,req.body.message]

    let sql = 'INSERT INTO `messages_tb` (name, email, message) VALUES (?, ?, ?)'

    connection.query(sql, data,  (err, result) => {
        if(err) throw err;
            console.log(result);
            res.json(data)
        });
    
    
});


app.listen(port, ()=>{
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${port}`)
})


























