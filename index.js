const express = require('express');
const port = 3000;
const app = express();
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb+srv://database:alovich@cluster0.givva.mongodb.net/moviesdb?retryWrites=true&w=majority', { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('moviesdb')

  })
  .catch(error => console.error(error));


  MongoClient.connect(/* ... */)
  .then(client => {
    // ...
    const db = client.db('moviesdb')
    app.use(/* ... */)
    app.get(/* ... */)
    app.post(/* ... */)
    app.listen(/* ... */)
  })
  .catch(console.error)

  MongoClient.connect(/* ... */)
  .then(client => {
    // ...
    const db = client.db('moviesdb')
    const quotesCollection = db.collection('index.js')

    // ...
  })

  app.post('/quotes', (req, res) => {
    quotesCollection.insertOne(req.body)
      .then(result => {
        console.log(result)
      })
      .catch(error => console.error(error))
  })
  

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

app.post('/movies/create', (req, res) => {
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
  
  app.put('/movies/update', (req, res) => {
               const response = { 
               status:200, message:'updates'}
               res.send(response);
               });
  
app.delete('/movies/delete', (req, res) => {
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
  

app.post('/movies/add', (req, res) => {
          const newTitle=req.query.title;
          const newYear= req.query.year;
          const newRating=req.query.rating;
          const allMovies={data:movies};
                if(newTitle==""||newTitle=="undefined"||  
                   newYear==""||newYear=="undefined"||    
                   newYear<1000||newYear>9999||(!newYear)){ 

                    const response = {
                      status:403, error:true, message:"you cannot create a movie without providing a title and a year"}
                  res.status(403);
                  res.send(response);
                }
                else if(newRating==""||newRating=="undefined"){
                 
                 movies.push({title:newTitle,year:newYear,rating:4})
                 res.status(200).send(allMovies);
                }
                else{
                movies.push({title:newTitle,year:newYear,rating:newRating})
                  res.status(200).send(allMovies);
                }
                
              });
      
 app.delete('/movies/delete/:id', (req, res) => {
            const id = req.params.id;
                if ( id  >= movies.legnth || id < 0) {
                
                    const response = {
                        status:404, error:true, message: "the movie " + id + " does not exist"};
            
            
                    res.status(404);
                    res.send(response);
                }
                else {
                    movies.splice(id, 1);
                    const response = {movies};
                    res.send(response);
                }
            });

app.put('/movies/update/:id', (req, res) => {
          const id = req.params.id;
          const newTitle = req.query.title;
          const newRating = req.query.rating;
            
            
              if(!movies[id]){
                const response = {
                  status:404, error:true, message: "the movie " + id + " does not exist"};
      
      
                  res.status(404);
                  res.send(response);
                }
                else if ((newTitle==""||newTitle==undefined)&&(newRating==""||newRating==undefined)){
                  res.status(200).send({data:movies});
                }
                else if(newTitle==""||newTitle==undefined){
                    movies[id].rating=newRating;
                    res.status(200).send({data:movies});
                  }
                  else if(newRating==""||newRating==undefined){
                    movies[id].title=newTitle;
                    res.status(200).send({data:movies});
                  }else{
                    movies[id].title=newTitle;
                    movies[id].rating=newRating;
                    res.status(200).send({data:movies});
                  }
            });

