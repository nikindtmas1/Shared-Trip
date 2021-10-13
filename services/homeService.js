const Trip = require('../models/trip');

function createTrip(tripData){

    let trip = new Trip(tripData);

    return trip.save();
}

module.exports = {
    createTrip,

}