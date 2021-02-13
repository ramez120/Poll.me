// Set up express
const express = require("express");

const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const passport = require("passport");
const keys = require("./config/keys");
const { session } = require("passport");
const bodyParser = require('body-parser');

require("./models/User");
require("./models/Survey");


require("./services/passport");

//initialize app
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded( {extended: true }));


// prepare cookies
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys : [keys.cookieKey]
  })
);


// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// routes

require("./routes/authRoutes")(app);
require("./routes/paymentRoutes")(app);
require("./routes/surveyRoutes")(app);


if(process.env.NODE_ENV === 'production'){
  // specific assets
  app.use(express.static("client/build"));
   // serve index.htl if all fails
   const path = require("path");
   app.get("*",(req,res) =>{
     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   })

}

// connect mongodb
mongoose.connect(keys.mongoURI);
 



const PORT = process.env.PORT || 5000;
app.listen(PORT);
