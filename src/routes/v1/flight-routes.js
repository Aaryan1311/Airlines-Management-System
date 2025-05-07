const express = require('express');
const router = express.Router();
const { FlightController } = require('../../controllers');
const { FlightMiddlewares } = require('../../middlewares');


 // /api/v1/flight POST  
router.post('/', 
    FlightMiddlewares.validateCreateRequest,
    FlightController.createFlight);


module.exports = router;