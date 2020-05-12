var express = require("express");
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
require("dotenv/config");
var corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
      'PATCH',
      'DELETE'
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };

app.use(cors(corsOpts));
app.use(bodyParser.json());

const postRoutes = require('./routes/posts');

app.use('/insertPlayer', postRoutes);


mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true}, (error) => {
    if (!error) {
        console.log('db connect success');
    } else {
        console.log('db connection error');
    }
});

// app.post('/insertPlayer', function(req, res){
//     res = {
//         id: 'fs54332432',
//         name: 'siva'
//     }
// })


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http:%s:%s", host, port)
})