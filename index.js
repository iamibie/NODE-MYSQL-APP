import express from 'express'
import dotenv from 'dotenv'
import asyncHandler from 'express-async-handler'
import mysql from 'mysql'

dotenv.config()
const port = process.env.PORT || 5000

const app = express()

app.use(express.json())

app.use(express.static('public/pages'))
app.use(express.static('public'))


//create a connection
var connection = mysql.createConnection({
    host     : process.env.HOSTNAME,
    user     : process.env.USERNAME,
    password : process.env.PASSWORD,
    database : process.env.DB
})

connection.connect((err)=>{
    if(err){
        throw err
    }

    console.log("MYSQL_DB connected...")
})


/*
//Create Database
app.get('/createdb',(req, res) =>{
    let sql = 'CREATE DATABASE portfoliodb'
    connection.query(sql, (err, result)=>{
        if (err) throw err;
        console.log(result)
        res.send('Database created...')
    })
})*/

//Create Table
app.get('/createtable', (req,res)=>{
    let sql = 'CREATE TABLE messages(id int AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), message VARCHAR(255), PRIMARY KEY (id))'
    connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Table created...')
        });
})

app.post('/message', (req,res) => {
   
    let data = [req.body.name,req.body.email,req.body.message]

    let sql = 'INSERT INTO `messages` (name, email, message) VALUES (?, ?, ?)'

    connection.query(sql, data,  (err, result) => {
        if(err) throw err;
            console.log('sent!');
            res.json(result)
        });
    
    
});


app.listen(port, ()=>{
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${port}`)
})


























