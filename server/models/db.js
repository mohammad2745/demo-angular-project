var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'demo_project'
});

connection.connect((err) => {
  if(err) {
    console.err('Error in connection ', err);
    return;
  } 
  console.log("Connected to database");
});

module.exports = connection