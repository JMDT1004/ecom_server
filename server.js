const db = require('./config/connection');
const express = require('express');
const routes = require('./routes');
const { Category, Product } = require('./models');

// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

db.sync().then(() => {
  // sync sequelize models to the database, then turn on the server
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
