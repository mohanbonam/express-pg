// Importing the express module
const express = require('express');
const app = express();
const PORT = 3000;

const studentRoutes = require('./src/student/routes');

// Middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello world')
});

app.use('/api/v1/students', studentRoutes);

// Listening to the port
app.listen(PORT, function(err){
  if (err) console.log(err);
  console.log(`Server listening on PORT - ${PORT}`);
});