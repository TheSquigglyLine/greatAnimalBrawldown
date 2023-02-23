const express = require('express'); // import express module (simplifies routing/requests, among other things)
const cors = require('cors'); // import the CORS library to allow Cross-origin resource sharing
const path = require('path');
const app = express(); // create an instance of the express module (app is the conventional variable name used)
var bodyParser = require('body-parser');

const services = require('./services/requests')

const PORT = process.env.PORT || 5000; // use either the host env var port (PORT) provided by Heroku or the local port (5000) on your machine

app.use(cors()); // Enable CORS 
app.use(express.json()); // Recognize Request Objects as JSON objects
app.use(express.static('build')); // serve static files (css & js) from the 'public' directory
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/animals', (req, res) => { // route root directory ('/' is this file (app.js))
  services.getNewAnimals(req, res);
});
app.post('/api/animals/animal-choice', (req, res) => {
  services.processAnimalChoice(req, res);
});
app.get('/api/animals/new-animals', (req, res) => {
  services.getNewAnimals(req, res);
});
app.get('/api/animals/all-animals', (req, res) => {
  services.getAllAnimals(req, res);
});
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})
app.listen(PORT, () => { // start server and listen on specified port
  console.log(`App is running on ${PORT}`) // confirm server is running and log port to the console
}) 