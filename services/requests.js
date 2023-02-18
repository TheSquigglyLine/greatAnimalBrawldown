const fetch = require('node-fetch'); // import node-fetch (enables the fetch API to be used server-side)
const { Pool } = require('pg'); // import node-postgres

const pool = new Pool({ // create connection to database
  connectionString: process.env.DATABASE_URL,	// use DATABASE_URL environment variable from Heroku app 
  ssl: {
    rejectUnauthorized: false // don't check for SSL cert
  }
});

const getEloRatings = (name1, name2) => {
  const eloString = `SELECT elo FROM animals WHERE name IN ($1, $2) ORDER BY CASE name WHEN $1 THEN 1 WHEN $2 THEN 2 END`;
  const values = [name1, name2];
  return pool.query(eloString, values)
    .then(result => result.rows)
    .catch(err => console.log(err));
}


const updateEloRating = (animal1Elo, animal2Elo, animal1Win, K = 32) => {
  // Constants for Elo calculation
  const expectedScore = (rating1, rating2) => 1 / (1 + Math.pow(10, (rating1 - rating2) / 400)); 
  
  // Calculate actual scores based on game result
  const player1Score = animal1Win ? 1 : 0;
  const player2Score = animal1Win ? 0 : 1;

  // Calculate new Elo ratings based on game result
  const player1NewElo = animal1Elo + K * (player1Score - expectedScore(animal2Elo, animal1Elo));
  const player2NewElo = animal2Elo + K * (player2Score - expectedScore(animal1Elo, animal2Elo));

  // Return updated Elo ratings
  return [Math.round(player1NewElo), Math.round(player2NewElo)];
}

const getRandomElo = () => {
  const minMaxQuery = 'SELECT MIN(elo), MAX(elo) FROM animals';
  return pool.query(minMaxQuery)
    .then(res => {
      const min = res.rows[0].min;
      const max = res.rows[0].max;
      const randomElo = Math.floor(Math.random() * (max - min +1) + min);
      return randomElo;
    })
    .catch(err => console.error(err));
}

const processAnimalChoice = (req, res) => {
  const { animal1, animal2, choice } = req.body;
  const animal1Str = String(animal1);
  const animal2Str = String(animal2);
  const choiceStr = String(choice);
  
  const animal1win = (choiceStr === animal1Str) ? 1 : 0;

  getEloRatings(animal1Str, animal2Str)
    .then(ratings => {

      const newRatings = updateEloRating(ratings[0].elo, ratings[1].elo, animal1win);

      console.log(animal1Str + " rating change: " + ratings[0].elo + " -> " + newRatings[0]);
      console.log(animal2Str + " rating change: " + ratings[1].elo + " -> " + newRatings[1]);
 

      const update1Query = `UPDATE animals SET elo = $1 WHERE name = $2`
      const update2Query = `UPDATE animals SET elo = $1 WHERE name = $2`

      const insertVoteQuery = 'INSERT INTO ratings (animal_1_name, animal_2_name, animal_1_elo, animal_2_elo, animal_1_win) VALUES ($1, $2, $3, $4, $5)'
      const values = [animal1Str, animal2Str, newRatings[0], newRatings[1], animal1win]
      pool.query(insertVoteQuery, values)
        .then(result => {})
        .catch(err => console.log(err))

      const value1 = [newRatings[0], animal1Str]
      const value2 = [newRatings[1], animal2Str]

      pool.query(update1Query, value1)
        .then(result => {})
        .catch(err => console.log(err))

      pool.query(update2Query, value2)
        .then(result => {})
        .catch(err => console.log(err))
    })
    .catch(error => console.log(error));

    const randomquery = `SELECT name, wikilink FROM animals ORDER BY random() LIMIT 2`;
    pool.query(randomquery)
      .then(result => res.json(result.rows)) 
      .catch(err => console.log(err));

    /* getRandomElo()
    .then(elo => {
      const getNewAnimalsQuery = `SELECT name, wikilink FROM animals ORDER BY ABS(elo - $1) LIMIT 2`
      pool.query(getNewAnimalsQuery,[elo])
        .then(result => res.json(result.rows)) 
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err)); */
}

const getNewAnimals = (req, res) => {
  const randomquery = `SELECT name, wikilink FROM animals ORDER BY random() LIMIT 2`;
  pool.query(randomquery)
    .then(result => res.json(result.rows)) 
    .catch(err => console.log(err));

  /* getRandomElo()
    .then(elo => {
      const getNewAnimalsQuery = `SELECT name, wikilink FROM animals ORDER BY ABS(elo - $1) LIMIT 2`
      pool.query(getNewAnimalsQuery,[elo])
        .then(result => res.json(result.rows)) 
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err)); */
    
}


module.exports = { processAnimalChoice, getNewAnimals }