const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();
const path = require('path')
const cors = require('cors');
const _dirname = path.dirname(__filename)
const buildPath = path.join(_dirname, "../client/build")
const app = express();
const bodyParser = require('body-parser'); // Import body-parser


app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['https://bobapos-3xci.onrender.com', 'http://localhost:5001'];
    const isAllowed = allowedOrigins.includes(origin) || !origin;
    callback(null, isAllowed);
  },
}));

// app.use(cors({
//   origin: '*',
// }));
app.options('*', cors());


app.use(express.static(buildPath));
app.use(bodyParser.json()); // Use body-parser middleware to parse JSON

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
  pool.query('SELECT * FROM teaorders;').then(query_res => {
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

app.get('/order/lastid', (req, res) => {
  pool.query('SELECT id FROM orders ORDER BY id DESC LIMIT 1;').then(query_res => {
    const lastId = query_res.rows.length > 0 ? query_res.rows[0].id : null;
    res.json({ lastId });
  }).catch(err => {
    res.status(500).json({error: err.message});
  });
});


//get all of the orders data
app.get('/ordersdata', cors(),(req, res) => {
  pool.query('SELECT * FROM orders LIMIT 100;').then(query_res => {
    res.json(query_res.rows);
  }).catch(err => {
    res.status(500).json({error: err.message});
  });
});

//get all of the employees data
app.get('/employeesdata', (req, res) => {
  pool.query('SELECT * FROM employees LIMIT 100;').then(query_res => {
    res.json(query_res.rows);
  }).catch(err => {
    res.status(500).json({error: err.message});
  });
});

app.get('/inventory/data', (req, res) => {
  pool.query('SELECT * FROM inventory LIMIT 100;').then(query_res => {
    res.json(query_res.rows);
  }).catch(err => {
    res.status(500).json({error: err.message});
  });
});

app.get('/menuinfo/data', (req, res) => {
  pool.query('SELECT * FROM teaorders LIMIT 100;').then(query_res => {
    res.json(query_res.rows);
  }).catch(err => {
    res.status(500).json({error: err.message});
  });
});

app.get('*', function (req, res) {
  res.sendFile(path.join(buildPath, 'index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.post('/inventory/post', async (request, response) => {
  console.log('Received request body:', request.body);

  const { itemId, quantity, itemCategory, minimumAmount } = request.body;

  try {
    await pool.query('INSERT INTO inventory (itemid, quantity, itemcategory, minimumamount) VALUES ($1, $2, $3, $4)', 
      [itemId, quantity, itemCategory, minimumAmount]);

    response.status(201).json({ message: 'Item added successfully' });
  } catch (error) {
    console.error('Error adding item:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// Edit item in the inventory
app.put('/inventory/edit/:id', async (request, response) => {
  const itemId = request.params.id;
  const { quantity, itemcategory, minimumamount } = request.body;

  try {
    await pool.query(
      'UPDATE inventory SET quantity = $1, itemcategory = $2, minimumamount = $3 WHERE itemid = $4',
      [quantity, itemcategory, minimumamount, itemId]
    );

    response.status(200).json({ message: 'Item updated successfully' });
  } catch (error) {
    console.error('Error updating item:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete item from the inventory
app.delete('/inventory/delete/:id', async (request, response) => {
  const itemId = request.params.id;

  try {
    await pool.query('DELETE FROM inventory WHERE itemid = $1', [itemId]);

    response.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});
////post menu info data
app.post('/menuinfo/post', async (request, response) => {
  console.log('Received request body:', request.body);

  const { id, name, price, ingredients, description, category } = request.body;

  try {
    await pool.query('INSERT INTO teaorders (id, tea_name, price, ingredients, descriptions, categories) VALUES ($1, $2, $3, $4, $5, $6)', 
      [id, name, price, ingredients, description, category]);

    response.status(201).json({ message: 'Item added successfully' });
  } catch (error) {
    console.error('Error adding item:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});
/////edit menu info data
app.put('/menuinfo/edit/:id', async (request, response) => {
  const itemId = request.params.id;
  const {name, price, ingredients, description, category } = request.body;

  try {
    await pool.query(
      'UPDATE teaorders SET tea_name = $2, price = $3, ingredients = $4, descriptions = $5, categories = $6 WHERE id = $1',
      [itemId, name, price, ingredients, description, category]
    );

    response.status(200).json({ message: 'Item updated successfully' });
  } catch (error) {
    console.error('Error updating item:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});
///// delete menu info data
app.delete('/menuinfo/delete/:id', async (request, response) => {
  const itemId = request.params.id;

  try {
    await pool.query('DELETE FROM teaorders WHERE id = $1', [itemId]);

    response.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});
/////
app.post('/employee/post', async (request, response) => {
  console.log('Received request body:', request.body);

  const { id, employeeName, salary, employeeRole } = request.body;

  try {
    await pool.query('INSERT INTO employees (id, employeename, salary, employeeRole) VALUES ($1, $2, $3, $4)', 
      [id, employeeName, salary, employeeRole]);

    response.status(201).json({ message: 'Item added successfully' });
  } catch (error) {
    console.error('Error adding item:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// Edit item in the inventory
app.put('/employee/edit/:id', async (request, response) => {
  const itemId = request.params.id;
  const { employeeName, salary, employeeRole } = request.body;

  try {
    await pool.query(
      'UPDATE employees SET employeeName = $1, salary = $2, employeeRole = $3 WHERE id = $4',
      [employeeName, salary, employeeRole, itemId]
    );

    response.status(200).json({ message: 'Item updated successfully' });
  } catch (error) {
    console.error('Error updating item:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete item from the inventory
app.delete('/employee/delete/:id', async (request, response) => {
  const itemId = request.params.id;

  try {
    await pool.query('DELETE FROM employees WHERE id = $1', [itemId]);

    response.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/order/post', async (request, response) => {
  console.log('Received request body:', request.body);

  const { id, totalAmount, orderDate, cashierName, paymentMethod, time } = request.body;

  try {
    await pool.query('INSERT INTO orders (id, totalAmount, orderdate, cashiername, paymentmethod, time) VALUES ($1, $2, $3, $4, $5, $6)', 
      [id, totalAmount, orderDate, cashierName, paymentMethod, time]);

    response.status(201).json({ message: 'Item added successfully' });
  } catch (error) {
    console.error('Error adding item:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(5001, () => {console.log("Server started on port 5001")})

