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
        ErrorResponse.message = 'Something went wrong while fetching flights';
        ErrorResponse.error = error;

        return res
        .status(error.statusCode)
        .json({ ErrorResponse });
    }
}

module.exports = {
    createFlight,
    getAllFlights
};