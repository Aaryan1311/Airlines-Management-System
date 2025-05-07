const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req,res,next){
    if(!req.body){
        ErrorResponse.message = 'Something went wrong in creating airport';
        ErrorResponse.error = new AppError( ['Name, Code, Address and CityId are required'], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }
    if(!req.body.name){
        ErrorResponse.message = 'Something went wrong while creating airport';
        ErrorResponse.error = new AppError( ['name cannot be null'], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }

    if(!req.body.code){
        ErrorResponse.message = 'Something went wrong while creating airport';
        ErrorResponse.error = new AppError( [ `code cannot be null`], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }

    if(!req.body.cityId){
        ErrorResponse.message = 'Something went wrong while creating airport';
        ErrorResponse.error = new AppError( ['cityId cannot be null'], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }



    next();
}


function validateUpdateRequest(req,res,next){
    if(!req.body){
        ErrorResponse.message = 'Something went wrong in updating airport';
        ErrorResponse.error = new AppError( ['Name, Code, Address and CityId are required'], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }
    next();
}


module.exports = {
    validateCreateRequest,
    validateUpdateRequest
}