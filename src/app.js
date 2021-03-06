const express = require('express');
const path = require('path');
const hbs = require('hbs');
const apicode = require('./utils/apicode');

const pathViews = path.join(__dirname, '../templates/views');
const pathPartials = path.join(__dirname, '../templates/partials');
const pathStatic = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

const app = express();
hbs.registerPartials(pathPartials);

app.set('view engine', 'hbs');
app.set('views', pathViews);

app.use(express.static(pathStatic));

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/jokes', (req, res) => {
  if(!req.query.number){
    res.send({
      Error : 'Empty Submission'
    });
  }
  else{
    apicode(req.query.number, (error, response) => {
      if(error) {
        res.send({
          Error : error
        });
      }
      else{
        res.send({
          Jokes : response
        });
      }
    });
  }
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/*', (req,res) => {
  res.send('<h1 style = "text-align: center">ERROR 404, CANNOT ACCESS UNDEFINED</h1>')
})

app.listen(PORT, () => {
  console.log(`Listening to Port ${PORT}`);
});