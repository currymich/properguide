// REQUIREMENTS
var express     = require('express');
var logger      = require('morgan');
var path        = require('path')
var history     = require('connect-history-api-fallback');
var app         = express();
var port        = process.env.PORT || 4000;

// MIDDLEWARE
app.use(express.static(path.join(__dirname, 'public')))

function enforceHttps(req, res, next) {
  if (!req.secure &&
    req.get("x-forwarded-proto") !== "https" &&
    process.env.NODE_ENV === "production") {
    res.redirect(301, `https://www.properguideimplant.com/${req.url}`);
  } else {
    next();
  }
}

app.use(enforceHttps);

app.use(history());


// LISTENERS
app.listen(port, function() {
  console.log("Server Initialized");
  console.log("Listening on " + port);
})
