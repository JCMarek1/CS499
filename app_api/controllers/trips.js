const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');


// Get: trips - lists all the tips
// Regarless of outcome, responce must inculde HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model
        .find({}) // No filter, return all records
        .exec();

        // Uncomment the following line to show results of querey
        // on the console
        // console.log(q);

    if(!q)
    { // Database returned no data
        return res
                .status(404)
                .json(err);    
    } else { // Return trip list
        return res
                .status(200)
                .json(q);    
    }
};

// Get: trips - lists a single trip
// Regarless of outcome, responce must inculde HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode}) // Return Single Record
        .exec();

        // Uncomment the following line to show results of querey
        // on the console
        // console.log(q);

    if(!q)
    { // Database returned no data
        return res
                .status(404)
                .json(err);    
    } else { // Return trip list
        return res
                .status(200)
                .json(q);    
    }
    
};

module.exports = {
    tripsList,
    tripsFindByCode
};