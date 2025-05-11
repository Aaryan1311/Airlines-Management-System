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
    let sortFilter =[];
    const endingTripTime = " 23:59:59";

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

    if(query.travellers){
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        };
    }

    if(query.tripDate){
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + endingTripTime]
        }
    }

    if(query.sort){
        const params = query.sort.split(',');
        const sortFilters = params.map((params) => params.split('_'));
        sortFilter = sortFilters ;
    }

    try{
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
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

async function getFlight(id){
    try {
        const flight = await flightRepository.get(id);
        return flight;
    }
    catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('flight not found.', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot fetch data of the flight.', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateSeats(data){
    try{
        const response = await flightRepository.updateRemainingSeats(data.flightId, data.seats, data.dec);
        return response;
    }
    catch(error){
        
        console.error('hi from the flight service block, updateerror is:', error);
        throw new AppError('Cannot update seats.', StatusCodes.INTERNAL_SERVER_ERROR);
    }

}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
};
