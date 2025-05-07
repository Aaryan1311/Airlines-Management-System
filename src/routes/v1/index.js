const express = require('express');
const router = express.Router();
const { InfoController } = require('../../controllers');
const aeroplaneRoutes = require('./aeroplane-routes');
const cityRoutes = require('./city-routes');
const flightRoutes = require('./flight-routes');
const airportRoutes = require('./airport-routes');



router.get('/info', InfoController.info);
router.use('/aeroplanes', aeroplaneRoutes);
router.use('/cities', cityRoutes);
router.use('/airports', airportRoutes);
router.use('/flights', flightRoutes);

module.exports = router;