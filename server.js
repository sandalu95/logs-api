// load up the express framework, body-parser helper and cors
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// create an instance of express to serve end points
const app = express();

// load up node's built in file system helper library here
// This will be used later to serve JSON files
const fs = require('fs');

// configure the express instance with some body-parser settings
// including handling JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// this is the place to handle various routes from
const routes = require('./routes/routes.js')(app, fs);

// launch the server on port 3001.
const server = app.listen(3001, () => {
    console.log('listening on port %s...', server.address().port);
});
