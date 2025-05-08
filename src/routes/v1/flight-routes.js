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



module.exports = router;