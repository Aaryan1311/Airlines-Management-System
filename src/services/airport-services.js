const { AirportRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const airportRepository = new AirportRepository();

async function createAirport(data) {
    try{
        const airport = await airportRepository.create(data);
        return airport;
    }
    catch(error){
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create airport.', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirports() {
    try {
        const airport = await airportRepository.getAll();
        return airport;
    }
    catch (error) {
        throw new AppError('Cannot fetch data of all the airport.', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(id) {
    try {
        const airport = await airportRepository.get(id);
        return airport;
    }
    catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('Airport not found.', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot fetch data of the airport.', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirportByCode(code) {
    try {
        const airport = await airportRepository.getAllWithFilter({code: code});
        return airport;
    }
    catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('Airport not found.', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot fetch data of the airport.', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirport(id) {
    try {
        const response = await airportRepository.destroy(id);
        return response;
    }
    catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('No such Airport found.', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot delete the airport.', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirport(id, data) {
    try {
        const airport = await airportRepository.update(id, data);
        return  airport;
    }
    catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('Airport not found.', StatusCodes.NOT_FOUND);
        }
        if(error.name == 'SequelizeValidationError'){
                let explanation = [];
                error.errors.forEach((err) => {
                    explanation.push(err.message);
                });
                throw new AppError(explanation, StatusCodes.BAD_REQUEST);
            }
        throw new AppError('Cannot update airport.', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createAirport,
    getAirports,
    getAirport,
    getAirportByCode,
    destroyAirport,
    updateAirport
};
