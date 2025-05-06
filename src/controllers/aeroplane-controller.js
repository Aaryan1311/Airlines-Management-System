const { AeroplaneSerives } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const { SuccessResponse } = require('../utils/common'); 


async function createAeroplane(req, res) {
    try{
        const aeroplane = await AeroplaneSerives.createAeroplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });

        SuccessResponse.data = aeroplane;
        SuccessResponse.message = 'Successfully created an aeroplane';

        return res
        .status(StatusCodes.CREATED)
        .json({ SuccessResponse });
    }
    catch(error){
        ErrorResponse.message = 'Something went wrong while creating aeroplane';
        ErrorResponse.error = error;

        return res
        .status(error.statusCode)
        .json({ ErrorResponse });
    }
}


async function getAeroplanes(req, res) {
    try {
        const aeroplanes = await AeroplaneSerives.getAeroplanes();
        SuccessResponse.data = aeroplanes;
        SuccessResponse.message = 'Successfully fetched all the aeroplanes';

        return res
        .status(StatusCodes.OK)
        .json({ SuccessResponse });
    }
    catch (error) {
        ErrorResponse.message = 'Something went wrong while fetching aeroplanes';
        ErrorResponse.error = error;
        console.log(error);
        return res
        .status(error.statusCode)
        .json({ ErrorResponse });
    }
}

module.exports = {
    createAeroplane,
    getAeroplanes
};