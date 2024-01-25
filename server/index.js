const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const personRoutes = require('./routes/personContactRoutes');
const db = require('./models/db');
const personContact = require('./models/personContact.model');

const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('./public/styles'));
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/admin', personRoutes);

// app.get('/', function (req, res) {
//   res.send('Hello World');
// });

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', 'views'); 

// index page
// app.get('/admin', async function (req, res) {
//   try {
//     const persons = await personContact.getPersonContact(); 
//     console.log("person ", persons);
//     res.render('pages/index', { persons });
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});