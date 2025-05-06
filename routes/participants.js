var express = require('express');
var db = require("../models");
var jsend = require('jsend');
var router = express.Router();
var ParticipantService = require("../services/ParticipantService");
var participantService = new ParticipantService(db);
const isAuth = require('../middleware/auth');

router.use(jsend.middleware);

router.post('/add', async(req, res) => { //add a user to db.
    const {email, firstName, lastName, dob, companyName, salary, currency, country, city} = req.body;
    console.log("Attempt to create a new participant:");
    if(email == null){
        return res.jsend.fail({"email": "Please provide an email"});
    }
    if(firstName == null){
        return res.jsend.fail({"firstName": "Please provide firstName"});
    }
    if(lastName == null){
        return res.jsend.fail({"lastName": "Please provide lastName"});
    }
    if(dob == null){
        return res.jsend.fail({"dob": "Please provide dob"});
    }
    if(companyName == null){
        return res.jsend.fail({"companyName": "Please provide companyName"});
    }
    if(salary == null){
        return res.jsend.fail({"salary": "Please provide salary"});
    }
    if(currency == null){
        return res.jsend.fail({"currency": "Please provide currency"});
    }
    if(country == null){
        return res.jsend.fail({"country": "Please provide country"});
    }
    if(city == null){
        return res.jsend.fail({"city": "Please provide city"});
    }

    //check that email doesn't already exist before creating a new one!
    emailInstance = await participantService.findByEmail(email);
    if(emailInstance != null){
        return res.jsend.fail({"Email": "Email already exists!", "email": emailInstance });
    }
    await participantService.create(email, firstName, lastName, dob, companyName, salary, currency, country, city);
    return res.jsend.success({"participant": "You created a new participant", "name": firstName});
});
  

router.get('/', async(req, res) => { //return all participants'
    console.log("Attempt to get all pariticpants");
    const allParticipants = await participantService.getAllParticipantNames();
    if(allParticipants == null){
        return res.jsend.fail({"No Participants": "There are no participants!"});
    }
    return res.jsend.success({"Participants:": allParticipants});
});


router.get('/details', isAuth, async(req, res) => { //return personal details about all users (first name, last name and email)
    console.log("Attempt to get all details");
    const participantsDetails = await participantService.getAll();
    if(participantsDetails == null){
        return res.jsend.fail({"No Participants": "There are no participants!"});
    }
    return res.jsend.success({"Participants:": participantsDetails});
});


router.get('/details/:email', isAuth,async(req, res) => { //return personal details about specific user based on email (first name, last name and email)
    const {email} = req.body;
    if(email == null){
        return res.jsend.fail({"email": "Please provide email"});
    }
    const participantDetails = await participantService.getParticipantDetailsByEmail(email);
    if(participantDetails == null){
        return res.jsend.fail({"Participant": "Participant does not exists with email:", "email": email });
    }
    return res.jsend.success({"ParticipantDetails:": participantDetails});
});


router.get('/work/:email', isAuth,async(req, res) => { //return WORK details for specified participant
    console.log("Attempt to get work");
    const {email} = req.body;
    if(email == null){
        return res.jsend.fail({"email": "Please provide email"});
    }
    const participantDetails = await participantService.getWorkDetails(email);
    if(participantDetails == null){
        return res.jsend.fail({"Participant": "Participant does not exists with email:", "email": email });
    }

    return res.jsend.success({"work details:": participantDetails});
});


router.get('/home/:email', isAuth,async(req, res) => { //return HOME details for specified participant
    console.log("Attempt to get home");
    const {email} = req.body;
    if(email == null){
        return res.jsend.fail({"email": "Please provide email"});
    }
    const participantDetails = await participantService.getHomeDetails(email);
    if(participantDetails == null){
        return res.jsend.fail({"Participant": "Participant does not exists with email:", "email": email });
    }

    return res.jsend.success({"work details:": participantDetails});
});



//following are deleting / updating an existing user!

router.delete('/:email', isAuth,async(req, res) => { //delete participant
    const {email} = req.body;
    if(email == null){
        return res.jsend.fail({"email": "Please provide email"});
    }
    const participantInstance = await participantService.findByEmail(email);
    if(participantInstance == null){
        return res.jsend.fail({"Participant": "failed to delete, participant does not exists with email:", "email": email });
    }
    await participantService.deleteByEmail(email);
    return res.jsend.success({"user deleted with email:": email});
});

router.put('/:email', isAuth,async(req, res) => { //update participant
    const {email, firstName, lastName, dob, companyName, salary, currency, country, city} = req.body;
    
    if(email == null){
        return res.jsend.fail({"email": "Please provide an email"});
    }
    if(firstName == null){
        return res.jsend.fail({"firstName": "Please provide firstName"});
    }
    if(lastName == null){
        return res.jsend.fail({"lastName": "Please provide lastName"});
    }
    if(dob == null){
        return res.jsend.fail({"dob": "Please provide dob"});
    }
    if(companyName == null){
        return res.jsend.fail({"companyName": "Please provide companyName"});
    }
    if(salary == null){
        return res.jsend.fail({"salary": "Please provide salary"});
    }
    if(currency == null){
        return res.jsend.fail({"currency": "Please provide currency"});
    }
    if(country == null){
        return res.jsend.fail({"country": "Please provide country"});
    }
    if(city == null){
        return res.jsend.fail({"city": "Please provide city"});
    }

    const participantInstance = await participantService.findByEmail(email);
    if(participantInstance == null){
        return res.jsend.fail({"Participant": "failed to update, participant does not exists with email:", "email": email });
    }
    const updatedParticipant = await participantService.updateByEmail(email, firstName, lastName, dob, companyName, salary, currency, country, city);
    return res.jsend.success({"user updated, new details:": updatedParticipant});
});

//only requests from admin should be able to delete a participant from the list!!

module.exports = router;