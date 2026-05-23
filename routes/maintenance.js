const express = require('express');
const router = express.Router();

const maintenanceController = require('../controllers/maintenance');

router.get('/', maintenanceController.getAll);
router.get('/:id', maintenanceController.getSingle);
router.post('/', maintenanceController.createMaintenance);
router.put('/:id', maintenanceController.updateMaintenance);
router.delete('/:id', maintenanceController.deleteMaintenance);

module.exports = router;