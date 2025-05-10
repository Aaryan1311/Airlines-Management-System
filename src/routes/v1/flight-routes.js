const express = require('express');
const router = express.Router();
const { FlightController } = require('../../controllers');
const { FlightMiddlewares } = require('../../middlewares');


 // /api/v1/flights POST  
router.post('/', 
    FlightMiddlewares.validateCreateRequest,
    FlightController.createFlight);


// /api/v1/flights?trips=MUM-DEL GET  
router.get('/', 
    FlightMiddlewares.validateGetRequest,
    FlightController.getAllFlights);

// /api/v1/flights/:id  GET
router.get('/:id', 
    FlightController.getFlight);

module.exports = router;