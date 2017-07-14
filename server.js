// REQUIREMENTS
var express     = require('express');
var logger      = require('morgan');
var path        = require('path')
var history     = require('connect-history-api-fallback');
var app         = express();
var port        = process.env.PORT || 4000;

// MIDDLEWARE
app.use(express.static(path.join(__dirname, 'public')))

app.get('/*', function(req,res, next){
  if(req.protocol != 'https'){
    res.redirect('https://www.properguideimplant.com'+req.url)
  }
  res.sendFile('public/index.html', { root: __dirname });
});
app.use(history());


// LISTENERS
app.listen(port, function() {
  console.log("Server Initialized");
  console.log("Listening on " + port);
})
