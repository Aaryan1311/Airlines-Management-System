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

// /api/v1/cities/:id DELETE
async function deleteCity(req,res){
    try {
        const city = await CityServices.destroyCity(req.params.id);
        SuccessResponse.data = city;
        SuccessResponse.message = 'Successfully deleted the city';

        return res
        .status(StatusCodes.OK)
        .json({ SuccessResponse });
    }
    catch (error) {
        ErrorResponse.message = 'Something went wrong while deleting city';
        ErrorResponse.error = error;
        return res
        .status(error.statusCode)
        .json({ ErrorResponse });
    }
}


async function updateCity(req, res) {
    try{
        const city = await CityServices.updateCity(req.params.id, {
            name: req.body.name,
        });
        SuccessResponse.data = city;
        SuccessResponse.message = 'Successfully updated the city';

        return res
        .status(StatusCodes.OK)
        .json({ SuccessResponse });
    }
    catch(error){

        ErrorResponse.message = 'Something went wrong while updating city';
        ErrorResponse.error = error;
        return res
        .status(error.statusCode)
        .json({ ErrorResponse });
    }
}


module.exports = {
    createCity,
    deleteCity,
    updateCity
};