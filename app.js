const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./utils/database');
const expRoutes = require('./routes/exp');

var cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: false }))

app.use('/', expRoutes);


sequelize.sync()
    .then((result) => {
        console.log("app started")
        app.listen(3000);
    })
    .catch(err => console.log(err));
