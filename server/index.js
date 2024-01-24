const express = require('express');
const personRoutes = require('./routes/personContactRoutes');
const app = express();

const db = require('./models/db');

const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/', personRoutes);

// app.get('/', function (req, res) {
//   res.send('Hello World');
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});