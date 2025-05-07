const { AirportServices } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const { SuccessResponse } = require('../utils/common'); 

// /api/v1/airport POST
async function createAirport(req, res) {
    try{
        const airport = await AirportServices.createAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId
        });

        SuccessResponse.data = airport;
        SuccessResponse.message = 'Successfully created an airport';

        return res
        .status(StatusCodes.CREATED)
        .json({ SuccessResponse });
    }
    catch(error){
        ErrorResponse.message = 'Something went wrong while creating airport';
        ErrorResponse.error = error;

        return res
        .status(error.statusCode)
        .json({ ErrorResponse });
    }
}

// /api/v1/airport GET
async function getAirports(req, res) {
    try {
        const airport = await AirportServices.getAirports();
        SuccessResponse.data = airport;
        SuccessResponse.message = 'Successfully fetched all the airports';

        return res
        .status(StatusCodes.OK)
        .json({ SuccessResponse });
    }
    catch (error) {
        ErrorResponse.message = 'Something went wrong while fetching airports';
        ErrorResponse.error = error;
        return res
        .status(error.statusCode)
        .json({ ErrorResponse });
    }
}

// /api/v1/airport/:id GET
async function getAirport(req, res) {
    try {
        const airport  = await AirportServices.getAirport(req.params.id);
        SuccessResponse.data = airport;
        SuccessResponse.message = 'Successfully fetched the airport';

        return res
        .status(StatusCodes.OK)
        .json({ SuccessResponse });
    }
    catch (error) {
        console.log(`this is airport error block ${error}`);
        ErrorResponse.message = 'Something went wrong while fetching airport data';
        ErrorResponse.error = error;
        return res
        .status(error.statusCode)
        .json({ ErrorResponse });
    }
}

// /api/v1/airport/:id DELETE
async function destroyAirport(req, res) {
    try {
        const airport = await AirportServices.destroyAirport(req.params.id);
        SuccessResponse.data = airport;
        SuccessResponse.message = 'Successfully deleted the airport';

        return res
        .status(StatusCodes.OK)
        .json({ SuccessResponse });
    }
    catch (error) {
        ErrorResponse.message = 'Something went wrong while deleting airport';
        ErrorResponse.error = error;
        return res
        .status(error.statusCode)
        .json({ ErrorResponse });
    }
}

// api/v1/airport/:id PATCH
async function updateAirport(req,res){
    try{
        const airport = await AirportServices.updateAirport(req.params.id, {
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId
        });
        SuccessResponse.data = airport;
        SuccessResponse.message = 'Successfully updated the airport';

        return res
        .status(StatusCodes.OK)
        .json({ SuccessResponse });
    }
    catch(error){

        ErrorResponse.message = 'Something went wrong while updating airport';
        ErrorResponse.error = error;
        return res
        .status(error.statusCode)
        .json({ ErrorResponse });
    }
} 

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
};