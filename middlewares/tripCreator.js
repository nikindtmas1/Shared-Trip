const homeService = require('../services/homeService');


async function isOwnTrip(req, res, next){
    
    let trip = await homeService.getOne(req.params.carId);

    if(trip.crreator == req.user._id){
         req.trip = trip;

         next();
    }else {

        next('You are not authorized to edit thismtrip!')
    }

}

module.exports = {
    isOwnTrip
}