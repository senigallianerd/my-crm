// install express server
const express = require('express');
const path = require('path');
const app = express();

// serve the dist app
app.use(express.static(__dirname + '/my-crm'));
app.get('/*',function(req,res) {
    res.sendFile(path.join(__dirname + '/my-crm/index.html'));
});

// start the app by listeing on the default heroku port
app.listen(process.env.PORT || 8080);
