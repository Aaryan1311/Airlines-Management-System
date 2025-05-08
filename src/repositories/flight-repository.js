const CrudRepository = require('./crud-repository');
const { Flight, Aeroplane, Airport, City} = require('../models');
const Sequelize = require('sequelize');

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter, sort) {
        const response = await Flight.findAll({
            where: filter,
            order: sort,
            include: [
                {
                    model: Aeroplane,
                    required: true,
                    as: 'aeroplaneDetails',
                },
                {
                    model: Airport,
                    required: true,
                    as: 'departureAirport',
                    on: {
                        col1: Sequelize.where(Sequelize.col('Flight.departureAirportCode'), '=', Sequelize.col('departureAirport.code')),
                    },
                    include: [
                        {
                            model: City,
                            require: true,
                        }
                    ]
                },
                {
                    model: Airport,
                    required: true,
                    as: 'arrivalAirport',
                    on: {
                        col1: Sequelize.where(Sequelize.col('Flight.arrivalAirportCode'), '=', Sequelize.col('arrivalAirport.code')),
                    },
                    include: [
                        {
                            model: City,
                            require: true,
                        }
                    ]
                }
    ]
        });
        return response; 
    }
}

module.exports = FlightRepository;