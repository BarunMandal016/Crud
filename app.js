const mysql = require('mysql2');
const express = require('express');

const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
var mysqlconnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'sql_inventory'
});
mysqlconnection.connect((err) => {
    if(!err)
         console.log('Database connected.');
    else
        console.log('Database not  connected.');     
    
}); 

 app.listen(3000,()=>{
    console.log('server listening on port 3000');
 });

 app.get('/store' , (res,req) => {
    mysqlconnection.query('SELECT * FROM products', (err, rows, fields) => {
        if (err) throw err
      
       // console.log(rows);
       res.send(rows);
      })
 });