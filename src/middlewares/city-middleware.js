const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req,res,next){
    if(!req.body){
        ErrorResponse.message = 'Something went wrong in creating city';
        ErrorResponse.error = new AppError( ['city field cannot be null'], StatusCodes.BAD_REQUEST);
        
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ErrorResponse});
    }
    next();
}


function validateUpdateRequest(req,res,next){
    if(!req.body){
        ErrorResponse.message = 'Something went wrong in updating city';
        ErrorResponse.error = new AppError( ['City field cannot be null'], StatusCodes.BAD_REQUEST);
        
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