// Basic required imports for NodeJS
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Create an instance of express for our app and instansiate bodyParser and cors
const app = (module.exports = express());
app.use(bodyParser.json());
app.use(cors());

// Get call to return JSON that formats natural and unix state
app.get("/dateValues/:date", function(req, res, next) {
  // request data for date
  const date = req.params.date;
  // options for formatting date
  const dateFormattingoptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  let naturalDate;
  let unixDate;
  // is not a unix value
  if (isNaN(date)) {
    naturalDate = new Date(date);
    naturalDate = naturalDate.toLocaleDateString(
      "en-us",
      dateFormattingoptions
    );
    unixDate = new Date(date).getTime() / 1000;
  } else {
    unixDate = date;
    naturalDate = new Date(date * 1000);
    naturalDate = naturalDate.toLocaleDateString(
      "en-us",
      dateFormattingoptions
    );
  }
  res.json({ unix: unixDate, natural: naturalDate });
});

app.listen(3000, function() {
  console.log("Working");
});
