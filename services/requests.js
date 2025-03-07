const fetch = require('node-fetch'); // import node-fetch (enables the fetch API to be used server-side)
const { Pool } = require('pg'); // import node-postgres

const pool = new Pool({ // create connection to database
  connectionString: process.env.DATABASE_URL,	// use DATABASE_URL environment variable from Heroku app 
  ssl: {
    rejectUnauthorized: false // don't check for SSL cert
  }
});

const getEloRatings = (name1, name2) => {
  const eloString = `SELECT elo, ratings FROM animals WHERE name IN ($1, $2) ORDER BY CASE name WHEN $1 THEN 1 WHEN $2 THEN 2 END`;
  const values = [name1, name2];
  return pool.query(eloString, values)
    .then(result => result.rows)
    .catch(err => console.log(err));
}


const updateEloRating = (animal1Elo, animal2Elo, animal1Win, animal1_count, animal2_count ) => {
  // Constants for Elo calculation
  const expectedScore = (rating1, rating2) => 1 / (1 + Math.pow(10, (rating1 - rating2) / 400));

  // Calculate actual scores based on game result
  const player1Score = animal1Win ? 1 : 0;
  const player2Score = animal1Win ? 0 : 1;

  const K1 = Math.max(4, 40 - (animal1_count / 15));
  const K2 = Math.max(4, 40 - (animal2_count / 15));

  // Calculate new Elo ratings based on game result
  const player1NewElo = animal1Elo + K1 * (player1Score - expectedScore(animal2Elo, animal1Elo));
  const player2NewElo = animal2Elo + K2 * (player2Score - expectedScore(animal1Elo, animal2Elo));

  // Return updated Elo ratings
  return [Math.round(player1NewElo), Math.round(player2NewElo)];
}

const getRandomElo = () => {
  const minMaxQuery = 'SELECT MIN(elo), MAX(elo) FROM animals';
  return pool.query(minMaxQuery)
    .then(res => {
      const min = res.rows[0].min;
      const max = res.rows[0].max;
      const randomElo = Math.floor(Math.random() * (max - min + 1) + min);
      console.log(randomElo);
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

      const newRatings = updateEloRating(ratings[0].elo, ratings[1].elo, animal1win, ratings[0].ratings, ratings[1].ratings);

      console.log(animal1Str + " rating change: " + ratings[0].elo + " -> " + newRatings[0]);
      console.log(animal2Str + " rating change: " + ratings[1].elo + " -> " + newRatings[1]);


      const update1Query = `UPDATE animals SET elo = $1 WHERE name = $2`
      const update2Query = `UPDATE animals SET elo = $1 WHERE name = $2`

      const insertVoteQuery = 'INSERT INTO ratings (animal_1_name, animal_2_name, animal_1_elo, animal_2_elo, animal_1_win, animal_1_old_elo, animal_2_old_elo) VALUES ($1, $2, $3, $4, $5, $6, $7)'
      const values = [animal1Str, animal2Str, newRatings[0], newRatings[1], animal1win, ratings[0].elo, ratings[1].elo]
      pool.query(insertVoteQuery, values)
        .then(result => { })
        .catch(err => console.log(err))

      const value1 = [newRatings[0], animal1Str]
      const value2 = [newRatings[1], animal2Str]

      /* pool.query(update1Query, value1)
        .then(result => {})
        .catch(err => console.log(err))

      pool.query(update2Query, value2)
        .then(result => {})
        .catch(err => console.log(err)) */
    })
    .catch(error => console.log(error));

  /* const randomquery = `SELECT name, wikilink FROM animals ORDER BY random() LIMIT 2`;
  pool.query(randomquery)
    .then(result => res.json(result.rows)) 
    .catch(err => console.log(err)); */

  getRandomElo()
    .then(elo => {
      const getNewAnimalsQuery = "SELECT * FROM (SELECT name, wikilink, ratings FROM animals ORDER BY ABS(elo - $1) LIMIT 30) subquery WHERE subquery.name NOT IN ($2, $3)";
      const data = [elo, animal1Str, animal2Str]
      pool.query(getNewAnimalsQuery, data)
        .then(result => {
          const rows = result.rows;
          const randomIndices = [Math.floor(Math.random() * rows.length), Math.floor(Math.random() * rows.length)];
          while (randomIndices[0] === randomIndices[1]) {
            randomIndices = [Math.floor(Math.random() * rows.length), Math.floor(Math.random() * rows.length)];
          }
          const animal1 = rows[randomIndices[0]];
          const animal2 = rows[randomIndices[1]];
          const response = {
            animal1: {
              name: animal1.name,
              wikilink: animal1.wikilink
            },
            animal2: {
              name: animal2.name,
              wikilink: animal2.wikilink
            }
          };

          res.json(response);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}
const getNewAnimals = (req, res) => {
  getRandomElo()
    .then(elo => {
      const getNewAnimalsQuery = `SELECT name, wikilink, ratings FROM animals ORDER BY ABS(elo - $1) LIMIT 50`;
      pool.query(getNewAnimalsQuery, [elo])
        .then(result => {
          const rows = result.rows;
          rows.sort((a, b) => a.ratings - b.ratings);
          const lowestRatings = rows.slice(0, 2);
          const animal1 = lowestRatings[0];
          const animal2 = lowestRatings[1];
          const response = {
            animal1: {
              name: animal1.name,
              wikilink: animal1.wikilink
            },
            animal2: {
              name: animal2.name,
              wikilink: animal2.wikilink
            }
          };

          res.json(response);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));

}
const getAllAnimals = (req, res) => {
  const getAllAnimalsQuer = 'SELECT id, name, ROUND(((elo - (SELECT MIN(elo) FROM animals))::numeric / ((SELECT MAX(elo) FROM animals) - (SELECT MIN(elo) FROM animals))::numeric * 100)) AS elo_percentage, wikilink, ratings FROM animals ORDER BY elo DESC'
  pool.query(getAllAnimalsQuer)
    .then(results => {
      res.json(results.rows);
      console.log('Get All Animals')
    })
    .catch(err => console.log(err));
}


module.exports = { processAnimalChoice, getNewAnimals, getAllAnimals }