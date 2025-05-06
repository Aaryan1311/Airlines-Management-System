const express = require('express');
const router = express.Router();
const { InfoController } = require('../../controllers');
const aeroplaneRoutes = require('./aeroplane-routes');
const cityRoutes = require('./city-routes');

router.use('/aeroplanes', aeroplaneRoutes);

router.get('/info', InfoController.info);

router.use('/cities', cityRoutes);

module.exports = router;