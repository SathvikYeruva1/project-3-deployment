const express = require('express');
const { Pool } = require('pg');
// const dotenv = require('dotenv').config();
const path = require('path')
const _dirname = path.dirname(__filename)
const buildPath = path.join(_dirname, "../client/build")
const app = express();

const port = 5001;

// app.use(express.static(buildPath))
// app.get("/*",function(req,res){
//   res.sendFile(
//     path.join(__dirname, "../client/build/index.html"),
//     function(err){
//       if(err){
//         res.status(500).send(err);
//       }
//     }
//   );
// })

const pool = new Pool({
  host: "csce-315-db.engr.tamu.edu",
  user: "csce315_971_blakeolson",
  port: 5432,
  password: "password",
  database: "csce315331_08b_db"
});

process.on('SIGINT', function(){
  pool.end();
  console.log('Application closed');
  process.exit(0);
});

app.get('/menuboard', (req, res) => {
  menuitemsnames = []
  pool.query('SELECT tea_name FROM teaorders;').then(query_res => {
          for (let i = 0; i < query_res.rowCount; i++){
              menuitemsnames.push(query_res.rows[i]);
          }
          const data = {menuitemsnames: menuitemsnames};
          res.json(data);
      });
});

app.get('/menuboard/teaorders', (req, res) => {
  menuitemsingredients = []
  pool.query('SELECT ingredients FROM teaorders;').then(query_res => {
          for (let i = 0; i < query_res.rowCount; i++){
              menuitemsingredients.push(query_res.rows[i]);
          }
          const data = {menuitemsingredients: menuitemsingredients};
          res.json(data);
      });
});

app.get('/menuboard/descriptions', (req, res) => {
  menuitemsdescriptions = []
  pool.query('SELECT descriptions FROM teaorders;').then(query_res => {
          for (let i = 0; i < query_res.rowCount; i++){
              menuitemsdescriptions.push(query_res.rows[i]);
          }
          const data = {menuitemsdescriptions: menuitemsdescriptions};
          res.json(data);
      });
});



app.listen(5001, () => {console.log("Server started on port 5001")})

