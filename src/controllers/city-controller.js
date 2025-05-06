const { CityServices } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const { SuccessResponse } = require('../utils/common'); 

// /api/v1/cities POST
async function createCity(req, res) {
    try{
        const city = await CityServices.createCity({
            name: req.body.name,
        });

        SuccessResponse.data = city;
        SuccessResponse.message = 'Successfully added a city';

        return res
        .status(StatusCodes.CREATED)
        .json({ SuccessResponse });
    }
    catch(error){
        ErrorResponse.message = 'Something went wrong while adding a city.';
        ErrorResponse.error = error;

        return res
        .status(error.statusCode)
        .json({ ErrorResponse });
    }
}

module.exports = {
    createCity,
};