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



app.get('/hello/:id', (req, res) => {
        const response = { 
            status:200, message:'Hello,'+ " "+ req.params.id}
            res.send(response);
        });

        
app.get('/search',(req,res) => {
            const search = req.query.s;
            
                if (typeof search != 'undefined') {
                
                    const response = {
                        status:200, message:"ok", data: search};
            
                    res.send(response);
                }
                else {
                    const response = {
                        status:500, error:true, message: "you have to provide a search"};
            
            
                    res.status(500);
                    res.send(response);
                }
            });

app.get('/movies/create', (req, res) => {
              const response = { 
              status:200, message:'create'}
              res.send(response);
              });
  
  const movies = [
                  { title: 'Jaws', year: 1975, rating: 8 },
                  { title: 'Avatar', year: 2009, rating: 7.8 },
                  { title: 'Brazil', year: 1985, rating: 8 },
                  { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
                 ]
  app.get('/movies/read', (req, res) => {
              const response = { 
              status:200, data: movies}
             res.send(response);
              });
  
  app.get('/movies/update', (req, res) => {
               const response = { 
               status:200, message:'updates'}
               res.send(response);
               });
  
app.get('/movies/delete', (req, res) => {
               const response = { 
               status:200, message:'delete'}
              res.send(response);
               });

               app.get("/movies/by-date", (req, res) => {
    
                const response = { 
                   status:200, data: movies.sort(function(a, b){
                       return a.year - b.year;
                      })}
      
                  res.send(response);
              });
                
  app.get("/movies/by-rating", (req, res) => {
          
                  const response = { 
                     status:200, data: movies.sort(function(a, b){
                         return a.rating - b.rating;
                        })}
        
                    res.send(response);
                }); 
                
  app.get("/movies/by-title", (req, res) => {
          
                  const response = { 
                     status:200, data: movies.sort(function(a, b){
                         return a - b;
                        })}
        
                    res.send(response);
                });


app.get('/movies/:title', (req, res) => {
                  
          const title = req.params.title;
        for (let movie of movies) {
                      if (movie.title === title) {
                          res.json(movie);
                          return;
                      }
                  }
                  const response = {
                    status:404, error:true, message: "the movie " + title + " does not exist"};
        
        
                res.status(404);
                res.send(response);
              });