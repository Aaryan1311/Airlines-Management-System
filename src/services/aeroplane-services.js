const { AeroplaneRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const aeroplaneRepository = new AeroplaneRepository();

async function createAeroplane(data) {
    try{
        const aeroplane = await aeroplaneRepository.create(data);
        return aeroplane;
    }
    catch(error){
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create aeroplane.', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAeroplanes() {
    try {
        const aeroplanes = await aeroplaneRepository.getAll();
        return aeroplanes;
    }
    catch (error) {
        throw new AppError('Cannot fetch data of all the aeroplanes.', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAeroplane(id) {
    try {
        const aeroplane = await aeroplaneRepository.get(id);
        return aeroplane;
    }
    catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('Aeroplane not found.', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot fetch data of the aeroplane.', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAeroplane(id) {
    try {
        const response = await aeroplaneRepository.destroy(id);
        return response;
    }
    catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('No such Aeroplane found.', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot delete the aeroplane.', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}



module.exports = {
    createAeroplane,
    getAeroplanes,
    getAeroplane,
    destroyAeroplane
};
