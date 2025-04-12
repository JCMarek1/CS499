const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');


// DEFINE ROUTE FOR OUR TRIPS ENDPOINT
router
    .route('/trips') 
    .get(tripsController.tripsList)
    .post(tripsController.tripsAddTrip);

// GET METHOD ROUTES tripsFindByCode - REQUIRE PARAMETER
//PUT Method
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip);

module.exports = router;