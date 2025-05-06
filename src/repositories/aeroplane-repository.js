const CrudRepository = require('./crud-repository');
const { Aeroplane } = require('../models');

class AeroplaneRepository extends CrudRepository {
    constructor() {
        super(Aeroplane);
    }
}

module.exports = AeroplaneRepository;