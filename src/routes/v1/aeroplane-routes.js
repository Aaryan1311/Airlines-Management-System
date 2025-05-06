const express = require('express');
const router = express.Router();
const { AeroplaneController } = require('../../controllers');
const { AeroplaneMiddlewares } = require('../../middlewares');


 // /api/v1/aeroplane POST  
router.post('/', 
    AeroplaneMiddlewares.validateCreateRequest,
    AeroplaneController.createAeroplane);

// /api/v1/aeroplane GET  
router.get('/', 
    AeroplaneController.getAeroplanes);
    
// /api/v1/aeroplane/:id GET
router.get('/:id', 
    AeroplaneController.getAeroplane);

// /api/v1/aeroplane/:id DELETE
router.delete('/:id', 
    AeroplaneController.destroyAeroplane);

// /api/v1/aeroplane/:id PATCH
router.patch('/:id', 
    AeroplaneMiddlewares.validateUpdateRequest,
    AeroplaneController.updateAeroplane);

module.exports = router;