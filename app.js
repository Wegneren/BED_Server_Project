require('dotenv').config(); // Load environment variables
const express = require('express');
const basicAuth = require('basic-auth');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//to make app keep running
const PORT = 3000;

//routes
var participant = require('./routes/participants');

const db = require('./models'); // Import Sequelize models
const ParticipantService = require('./services/ParticipantService');

db.sequelize.sync({force:false}); //if this is true it will drop the tables and recreate them. Meaning if true, data is not persistent (at least not when I restart)

var app = express();


//could populate db with the admin here
const participantService = new ParticipantService(db);
const createAdminParticipant = async () => {
  //check if admin exist:
  const admin = await participantService.findByEmail("admin@example.com");
  console.log("do we have an admin? " + admin);
  if(!admin){
    try{
      await participantService.create(
        "admin@example.com",  // email
        "Admin",              // firstName
        "Nimda",               // lastName
        "2000-01-01",         // dob (valid ISO format)
        "AdminCorp",          // companyName
        "99999",                  // salary
        "ADMIN",                // currency (make sure this matches your model)
        "AdminCountry",                 // country
        "AdminTown"          // city
      );
    } catch(error){
      //error creating admin
      console.log("error creating admin!" + error);
    }
  }
};
createAdminParticipant();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes 
app.use('/participants', participant);


// catch 404 and forward to error handler
app.use(function (req, res, next) { //not sure if this one is required for a back-end only? 
	//next(createError(404));
  res.status(404).json({ message: 'Route not found' });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
  
	res.status(err.status || 500);
	res.render('error');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;