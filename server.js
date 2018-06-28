const express = require("express");
const bodyParse = require("body-parser");
const _ = require('lodash');
const cors = require('cors');
const axios = require('axios');


var app = express();
var corsOptions = {
    origin: ['http://localhost:3000', 'http://caml112497.rms.com:3000'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true
}

app.use(cors(corsOptions));

// bodyParse converts json to object and attache it to request
app.use(bodyParse.json());

// Routes
app.get("/bingApi", (req, res) => {
    var query = req.query.q;
    query.replace(' ', '%20');

    var url = `https://www.bing.com/api/v6/Places/AutoSuggest?q=${query}&appid=D41D8CD98F00B204E9800998ECF8427E1FBE79C2&count=5&structuredaddress=true`
    // console.log(url);
    axios.get(url)
        .then(response => {
            // console.log(response.data);
            // var address = _.filter(response.data.value, [type=_.identity])
            res.send(response.data.value); 
        })
        .catch(error => {
            console.log(error);
        });
});


//---- Start the server
const PORT = process.env.PORT || 8888; // for prod deployment

app.listen(PORT, () => {
    console.log(`Started on port ${PORT}`);
});

module.exports = { app }; // for unit test