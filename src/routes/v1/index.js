const express = require('express');
const router = express.Router();
const { InfoController } = require('../../controllers');
const aeroplaneRoutes = require('./aeroplane-routes');

router.use('/aeroplanes', aeroplaneRoutes);

router.get('/info', InfoController.info);

module.exports = router;