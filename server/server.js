const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();
const path = require('path')
const cors = require('cors');
const { Translate } = require('@google-cloud/translate').v2;
const _dirname = path.dirname(__filename)
const buildPath = path.join(_dirname, "../client/build")
const app = express();

app.use(cors({
  origin: 'http://localhost:5001',
}));
app.options('*', cors());


app.use(express.static(buildPath));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:5001');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// app.use('/static', express.static(path.join(_dirname, 'client/src/components'));

// app.get("/",function(req,res){
//   res.sendFile(
//     path.join(__dirname, "../client/build/index.html"),
//     function(err){
//       if(err){
//         res.status(500).send(err);
//       }
//     }
//   );
// })
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const translate = new Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id
});


const pool = new Pool({
  host: process.env.PSQL_HOST,
  user: process.env.PSQL_USER,
  port: process.env.PSQL_PORT,
  password: process.env.PSQL_PASSWORD,
  database: process.env.PSQL_DATABASE
});

process.on('SIGINT', function(){
  pool.end();
  console.log('Application closed');
  process.exit(0);
});

app.get('/translate', async(req,res) => {
  const {text, wantedLanguage} = req.query;

  try{
    const translated = await translate(text, {to: wantedLanguage});
    res.json({translated : translated.text}); 
  }
  catch(err){
    res.status(500).json({error: err.message});
  }
});

app.get('/menudata', (req, res) => {
  menuitemsnames = []
  pool.query('SELECT tea_name FROM teaorders;').then(query_res => {
          for (let i = 0; i < query_res.rowCount; i++){
              menuitemsnames.push(query_res.rows[i]);
          }
          const data = {menuitemsnames: menuitemsnames};
          res.json(data);
      });
});

app.get('/menudata/teaorders', (req, res) => {
  menuitemsingredients = []
  pool.query('SELECT ingredients FROM teaorders;').then(query_res => {
          for (let i = 0; i < query_res.rowCount; i++){
              menuitemsingredients.push(query_res.rows[i]);
          }
          const data = {menuitemsingredients: menuitemsingredients};
          res.json(data);
      });
});

app.get('/menudata/descriptions', (req, res) => {
  menuitemsdescriptions = []
  pool.query('SELECT descriptions FROM teaorders;').then(query_res => {
          for (let i = 0; i < query_res.rowCount; i++){
              menuitemsdescriptions.push(query_res.rows[i]);
          }
          const data = {menuitemsdescriptions: menuitemsdescriptions};
          res.json(data);
      });
});

app.get('*', function (req, res) {
  res.sendFile(path.join(buildPath, 'index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});



app.listen(5001, () => {console.log("Server started on port 5001")})

