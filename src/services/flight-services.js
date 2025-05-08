const { FlightRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');
const { compareTimestamps } = require('../utils/helpers/datetime-helpers');
const AppError = require('../utils/errors/app-error');
const flightRepository = new FlightRepository();

async function createFlight(data) {
    try{
        const flight = await flightRepository.create(data);
        return flight;
    }
    catch(error){
        console.log(error);
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create flight.', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query){
    // trips  = MUM-DEL
    let customFilter = {};

    if(query.trips){
        [departureAirportCode, arrivalAirportCode] = query.trips.split('-');

        customFilter = {
            departureAirportCode: departureAirportCode,
            arrivalAirportCode: arrivalAirportCode
        };
    }

    if(query.price){
        [minPrice, maxPrice] = query.price.split('-');

        customFilter.price = {
            [Op.between]: [minPrice,((maxPrice == undefined) ? 20000 : maxPrice)]
        };
    }

    try{
        const flights = await flightRepository.getAllFlights(customFilter);
        if(flights.length == 0){
            throw new AppError('No flights found.', StatusCodes.NOT_FOUND);
        }
        if(compareTimestamps(Date.now(),flights[0].departureTime)){
            throw new AppError('Flight Depatured', StatusCodes.BAD_REQUEST);
        }
        return flights;
        
    }
    catch(error){
        console.log(`this is flight-service error block ${error}`);
        if(error instanceof AppError){
            throw error;
        }
        throw new AppError('Cannot get flights.', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createFlight,
    getAllFlights
};
