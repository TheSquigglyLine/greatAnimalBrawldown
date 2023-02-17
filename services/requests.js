const fetch = require('node-fetch'); // import node-fetch (enables the fetch API to be used server-side)
const { Pool } = require('pg'); // import node-postgres

const pool = new Pool({ // create connection to database
  connectionString: process.env.DATABASE_URL,	// use DATABASE_URL environment variable from Heroku app 
  ssl: {
    rejectUnauthorized: false // don't check for SSL cert
  }
});

const getAllActivities = (req, res) => {
  const getString = 'SELECT * FROM my_activities'; // select all rows from the 'my_activities' table
  const countString = 'SELECT count(*) FROM my_activities' // get total row count from the 'my_activities' table
  pool.query(getString) // send query to select all rows from the 'my_activities' table 
    .then(activityResults => {
      let activities = activityResults.rows;
      pool.query(countString) // send query to get total row count from the 'my_activities' table
        .then(countResult => {
          let count = countResult.rows[0].count;
          console.log('Activities List:', activities);
          console.log(`Activities Count: ${count}`);
          res.json({ activities, count})
          // res.render('index', { activities: activities, count: count }); // render index.ejs, and send activity and count results to index.ejs
          // TODO: Send info to frontend 
        })
    })
    .catch(err => console.log(err));
}

const getSingleActivity = (req, res) => {
  fetch('https://www.boredapi.com/api/activity') // fetch activity from bored API - https://www.boredapi.com/about
    .then(data => data.json()) // return a promise containing the response
    .then(json => res.json(json)) // extract the JSON body content from the response (specifically the activity value) and sends it to the client
    .catch((err) => console.log(err)) // log errors to the console
}

const addActivityToDB = (req, res) => {
  const activity = [ req.body.activity ]

  const addString = 'INSERT INTO my_activities (activity) VALUES ($1) RETURNING *'; // insert value into my_activities' table

  pool.query(addString, activity)
    .then(result => res.json(result))
    .catch(err => console.log(err));
}

const deleteAllActivites = (req, res) => {
  const removeString = 'DELETE FROM my_activities'; // delete all items in the 'my_activities' table
  pool.query(removeString) // send query delete all items in the 'my_activities' table
    .then(res.send('All activities cleared!')) // send confirmation to the browser
    .catch(err => console.log(err));  
}

const getEloRatings = (name1, name2) => {
  const eloString = `SELECT elo FROM animals WHERE name IN ($1, $2)`;
  const values = [name1, name2];
  return pool.query(eloString, values)
    .then(result => result.rows)
    .catch(err => console.log(err));
}


const updateEloRating = (animal1Elo, animal2Elo, animal1Win, K = 32) => {
  // Constants for Elo calculation
  console.log(animal1Elo);
  console.log(animal2Elo);
  const expectedScore = (rating1, rating2) => 1 / (1 + Math.pow(10, (rating2 - rating1) / 400)); // expected score of player 1
  
  // Calculate actual scores based on game result
  const player1Score = animal1Win ? 1 : 0;
  const player2Score = animal1Win ? 0 : 1;

  // Calculate new Elo ratings based on game result
  const player1NewElo = animal1Elo + K * (player1Score - expectedScore(animal1Elo, animal2Elo));
  const player2NewElo = animal2Elo + K * (player2Score - expectedScore(animal2Elo, animal1Elo));

  console.log(player1NewElo);
  console.log(player2NewElo);
  // Return updated Elo ratings
  return [Math.round(player1NewElo), Math.round(player2NewElo)];
}

const getMinMaxElo = () => {
  const minMaxQuery = 'SELECT MIN(elo), MAX(elo) FROM animals';
  return pool.query(minMaxQuery)
    .then(res => {
      const min = res.rows[0].min;
      const max = res.rows[0].max;
      return [min, max];
    })
    .catch(err => console.error(err));
}

const getRandomAnimal = (minElo, maxElo) => {
  const randomquery = `SELECT name FROM animals WHERE elo BETWEEN ${minElo} AND ${maxElo} ORDER BY random() LIMIT 2`;
  return pool.query(randomquery)
    .then(result => result.rows.map(row => row.name))
    .catch(err => console.log(err));
}

const processAnimalChoice = (req, res) => {
  const { animal1, animal2, choice } = req.body;
  console.log(req.body);
  const animal1Str = String(animal1);
  const animal2Str = String(animal2);
  const choiceStr = String(choice);
  
  const animal1win = (choiceStr === animal1Str) ? 1 : 0;

  console.log(animal1win);
  getEloRatings(animal1Str, animal2Str)
    .then(ratings => {
      //eloratings.push(...ratings);
      console.log(ratings);
      const newRatings = updateEloRating(ratings[0].elo, ratings[1].elo, animal1win)
        
      console.log(newRatings);
      const update1Query = `UPDATE animals SET elo = $1 WHERE name = $2`
      const update2Query = `UPDATE animals SET elo = $1 WHERE name = $2`
      const value1 = [newRatings[0], animal1Str]
      const value2 = [newRatings[1], animal2Str]
      pool.query(update1Query, value1)
        .then(result => console.log(result))
        .catch(err => console.log(err))
      pool.query(update2Query, value2)
        .then(result => console.log(result))
        .catch(err => console.log(err))
    })
    .catch(error => console.log(error));

  
    const randomquery = `SELECT name FROM animals ORDER BY random() LIMIT 2`;
    pool.query(randomquery)
      .then(result => res.json(result.rows)) 
      .catch(err => console.log(err));

}

const getNewAnimals = (req, res) => {
  const randomquery = `SELECT name FROM animals ORDER BY random() LIMIT 2`;
  pool.query(randomquery)
    .then(result => res.json(result.rows)) 
    .catch(err => console.log(err));

  /* getMinMaxElo()
    .then(spread => {
      getRandomAnimal(spread[0],spread[1])
        .then(result => res.json(result))
        .catch(err => console.log(err))
    })
    .catch(error => console.log(error)); */
}


module.exports = { getSingleActivity, addActivityToDB, getAllActivities, deleteAllActivites, processAnimalChoice, getNewAnimals }