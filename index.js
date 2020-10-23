const express = require('express');
const port = 3000;
const app = express();

app.listen(port, function () {
    console.log("Server is running on "+ port +" port");
  });
  
app.get('/', function (req, res) {
    res.send('<h1>ok<h1>');
  });


app.get('/test',(req,res) => {
    const response = {
           status:200, message:"ok"}
       res.send(response);
   });
 

var x = new Date();
app.get('/time',(req,res) => {
       const response = {
               status:200, message: x.getHours() + ":" + x.getSeconds()}
           res.send(response);
       });