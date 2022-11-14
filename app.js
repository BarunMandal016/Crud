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

 app.get('/get-post' , (req,res) => {
    mysqlconnection.query('SELECT * FROM products', (err, rows, fields) => {
        if (err) throw err
      
       console.log(rows);
       res.send(rows);
      }) 
 });
  
  app.delete('/delete-post', checkUser,(req,res) => {
    const id = req.body.id

    const query = "DELETE FROM products WHERE product_id = "+id+""
    mysqlconnection.query(query,(err,data,fields) => {
        if(!err)
            res.send('Deleted successfully. ');
        else
            console.log(err);
    })

 });

 app.post('/create-post',(req,res) => {
    const name = req.body.name
    const quantity = req.body.quantity
    const price = req.body.price

    const query = "insert products(`name`,`quantity_in_stock`, `unit_price`) value( '"+name+"', "+quantity+", "+price+")"

    console.log(query)

    mysqlconnection.query(query,(err,rows,fields) => {
        if(!err)
        res.json({"create with":req.body});
        else
        console.log(err);
    })
 });

app.put('/update-post', checkUser, (req, res)=>{

    const price = req.body.price
    const query = "update products set unit_price="+price+" where product_id = "+req.body.id+""

    mysqlconnection.query(query, (error, data)=>{
        if(!error){
            res.json({"updated value is": req.body})
        }
        console.log(error)
    })

});


 function checkUser(req, res, next){
    const id = req.body.id
    const query = "SELECT * FROM products where product_id =  "+id+""


    mysqlconnection.query(query,(err,data,fields) => {
        console.log(data)
        if(data[0]){
            next()
            
        }else{
            res.send("User not found")
        }
        // console.log(err);
    })

 }