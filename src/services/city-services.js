const { CityRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const cityRepository = new CityRepository();

async function createCity(data) {
    try{
        const city = await cityRepository.create(data);
        return city;
    }
    catch(error){
        console.log(error);
        if(error.name == 'SequelizeUniqueConstraintError' || error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create city object.', StatusCodes.DUPLICATE_ENTRY);
    }
}

async function destroyCity(id){
    try {
        const response = await cityRepository.destroy(id);
        return response;
    }
    catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('No such city found.', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot delete the city.', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createCity,
    destroyCity
};