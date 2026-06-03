const express = require('express');
const router = express.Router();

const maintenanceController = require('../controllers/maintenance');
const isAuthenticated = require('../middleware/authenticate');

// Public routes
router.get('/', maintenanceController.getAll);
router.get('/:id', maintenanceController.getSingle);

/* #swagger.parameters['body'] = {
  in: 'body',
  required: true,
  schema: {
    vehicleModel: 'WRX Premium',
    serviceType: 'Oil Change',
    cost: 140,
    mechanic: 'Subie Performance Garage',
    mileage: 16000,
    serviceDate: '2026-05-29',
    notes: 'Changed oil and inspected turbo system'
  }
} */

// Protected routes
router.post('/', isAuthenticated, maintenanceController.createMaintenance);

/* #swagger.parameters['body'] = {
  in: 'body',
  required: true,
  schema: {
    vehicleModel: 'WRX Premium',
    serviceType: 'Oil Change',
    cost: 150,
    mechanic: 'Subie Performance Garage',
    mileage: 16500,
    serviceDate: '2026-05-30',
    notes: 'Updated maintenance record after service'
  }
} */

router.put('/:id', isAuthenticated, maintenanceController.updateMaintenance);

router.delete('/:id', isAuthenticated, maintenanceController.deleteMaintenance);

module.exports = router;