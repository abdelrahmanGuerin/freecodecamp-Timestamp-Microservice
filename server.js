// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/", function(req, res) {
  let date = new Date();
  res.json({ unix: parseInt(date.valueOf()), utc: date.toUTCString() });
});

app.get("/api/:temps", function(req, res) {
  let temps = req.params.temps;
  if (/\d{5,}/.test(temps)) {
    dateInt = parseInt(temps);
    return res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });
  }
  let dateObject = new Date(temps);

  if (dateObject.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  } else {
    return res.json({ unix: parseInt(dateObject.valueOf()), utc: dateObject.toUTCString() });
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

