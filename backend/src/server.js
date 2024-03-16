const express = require('express');
const dotenv = require('dotenv');

//configuration files
const configExpress = require('./config/express-configuration');
const configDatabase = require('./config/database-configuration');
const configRoutes = require('./config/routes-configuration');

const app = express();

//It will read .env file and paste everything inside the process.env object
dotenv.config();

configExpress(app);
configRoutes(app);

//connect to the database before listening
configDatabase(app).then(() => {
    app.listen(
        process.env['PORT'] || 5000,
        () => console.log('Server listening on port ' + (process.env['PORT'] || 5000))
    )
});