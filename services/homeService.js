const Trip = require('../models/trip');

function createTrip(tripData){

    let trip = new Trip(tripData);

    return trip.save();
}

async function getAll(query){

    let result = await Trip.find({}).lean();

    return result;
}

async function getOne(id){

    let result = await Trip.findById(id).lean();

    return result;

}

module.exports = {
    createTrip,
    getAll,
    getOne,
}