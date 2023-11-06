const { Client } = require('pg');

const client = new Client({
  host: "csce-315-db.engr.tamu.edu",
  user: "csce315_971_blakeolson",
  port: 5432,
  password: "password",
  database: "csce315331_08b_db"
})

client.connect()

client.query(`Select * from inventory`, (err, res) =>{
  if (!err){
    console.log(res.rows)
  } else {
    console.log(err.message)
  }
  client.end
})