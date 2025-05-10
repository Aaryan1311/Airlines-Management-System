const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const { compareTimestamps } = require('../utils/helpers/datetime-helpers');
const { getAirportByCode } = require('../services/airport-services');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req,res,next){
    if(!req.body){
        ErrorResponse.message = 'Something went wrong in creating flight';
        ErrorResponse.error = new AppError( ['Body cannot be null'], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }
    if(!req.body.flightNumber){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError( ['flightNumber cannot be null'], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }

    if(!req.body.aeroplaneId){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError( [ `aeroplaneId cannot be null`], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }

    if(!req.body.departureAirportCode){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError( ['departureAirportCode cannot be null'], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }

    if(!req.body.arrivalAirportCode){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError( ['arrivalAirportCode cannot be null'], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }

    if(!req.body.arrivalTime){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError( ['arrivalTime cannot be null'], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }

    if(!req.body.departureTime){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError( ['departureTime cannot be null'], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }

    if(!req.body.price){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError( ['price cannot be null'], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }

    if(!req.body.boardingGate){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError( ['boardingGate cannot be null'], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }

    if(!req.body.totalSeats){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError( ['totalSeats cannot be null'], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }

    if(!compareTimestamps(req.body.arrivalTime, req.body.departureTime)){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError( ['Arrival time should be greater than departure time'], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }

    next();
}

function validateGetRequest(req,res,next){
    if(!req.query){
        ErrorResponse.message = 'Something went wrong in fetching flight details';
        ErrorResponse.error = new AppError( ['Query cannot be null'], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }

    if(!req.query.trips){
        ErrorResponse.message = 'Something went wrong in fetching flight details';
        ErrorResponse.error = new AppError( ['trips cannot be null'], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }
    const [departureAirportCode, arrivalAirportCode] = req.query.trips.split('-');
    if(!departureAirportCode || !arrivalAirportCode){
        ErrorResponse.message = 'Something went wrong in fetching flight details';
        ErrorResponse.error = new AppError( ['Invalid trip details'], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }
    
    if(departureAirportCode == arrivalAirportCode){
        ErrorResponse.message = 'Something went wrong in fetching flight details';
        ErrorResponse.error = new AppError( ['Invalid trip details'], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }

    getAirportByCode(departureAirportCode).then((airport) => {
        if(airport.length == 0){
            ErrorResponse.message = 'Something went wrong in fetching flight details';
            ErrorResponse.error = new AppError( ['Invalid Departure Airport details'], StatusCodes.BAD_REQUEST);
            
            return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ ErrorResponse});
        }
    });

    getAirportByCode(arrivalAirportCode).then((airport) => {
        if(airport.length == 0){
            ErrorResponse.message = 'Something went wrong in fetching flight details';
            ErrorResponse.error = new AppError( ['Invalid Arrival Airport details'], StatusCodes.BAD_REQUEST);
            
            return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ ErrorResponse});
        }
    });

    next();
}

function validateUpdateSeatsRequest(req,res,next){
    if(!req.body.seats){
        ErrorResponse.message = 'Something went wrong in updating flight details';
        ErrorResponse.error = new AppError( ['seats cannot be null'], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }

    next();
}

module.exports = {
    validateCreateRequest,
    validateGetRequest,
    validateUpdateSeatsRequest
}
