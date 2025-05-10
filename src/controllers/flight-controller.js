const { FlightServices } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const { SuccessResponse } = require('../utils/common'); 

// /api/v1/airport POST
async function createFlight(req, res) {
    try{
        const airport = await FlightServices.createFlight({
            flightNumber: req.body.flightNumber,
            aeroplaneId: req.body.aeroplaneId,
            departureAirportCode: req.body.departureAirportCode,
            arrivalAirportCode: req.body.arrivalAirportCode,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats,
        });

        SuccessResponse.data = airport;
        SuccessResponse.message = 'Successfully created an flight';

        return res
        .status(StatusCodes.CREATED)
        .json({ SuccessResponse });
    }
    catch(error){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = error;

        return res
        .status(error.statusCode)
        .json({ ErrorResponse });
    }
}

async function getAllFlights(req, res) {
    try{
        const flights = await FlightServices.getAllFlights(req.query);
        SuccessResponse.data = flights;
        SuccessResponse.message = 'Successfully fetched all flights';

        return res
        .status(StatusCodes.OK)
        .json({ SuccessResponse });
    }
    catch(error){
        console.log(`this is flight-controller error block ${error}`);
        ErrorResponse.message = 'Something went wrong while fetching flights';
        ErrorResponse.error = error;

        return res
        .status(error.statusCode)
        .json({ ErrorResponse });
    }
}

async function getFlight(req, res) {
    try {
        const flight  = await FlightServices.getFlight(req.params.id);
        SuccessResponse.data = flight;
        SuccessResponse.message = 'Successfully fetched the flight';

        return res
        .status(StatusCodes.OK)
        .json({ SuccessResponse });
    }
    catch (error) {
        ErrorResponse.message = 'Something went wrong while fetching flight data';
        ErrorResponse.error = error;
        return res
        .status(error.statusCode)
        .json({ ErrorResponse });
    }
}

async function updateSeats(req, res) {
    try{
        const response = await FlightServices.updateSeats({
            flightId: req.params.id,
            seats: req.body.seats,
            dec: req.body.dec
        });
        SuccessResponse.data = response;
        SuccessResponse.message = 'Successfully updated the flight';

        return res
        .status(StatusCodes.OK)
        .json({ SuccessResponse });
    }
    catch(error){
        console.log(`this is flight-controller error block ${error}`);
        ErrorResponse.message = 'Something went wrong while updating flight';
        ErrorResponse.error = error;

        return res
        .status(error.statusCode)
        .json({ ErrorResponse });
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
};