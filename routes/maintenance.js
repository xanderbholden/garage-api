const express = require('express');
const router = express.Router();

const maintenanceController = require('../controllers/maintenance');
const isAuthenticated = require('../middleware/authenticate');

router.get('/', maintenanceController.getAll);
router.get('/:id', maintenanceController.getSingle);

router.post(
  '/',
  isAuthenticated,
  /* #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: {
      vehicleModel: 'NSX',
      serviceType: 'Timing Belt and Water Pump Replacement',
      cost: 1850,
      mechanic: 'Acura Performance Specialists',
      mileage: 47000,
      serviceDate: '2026-05-28',
      notes: 'Replaced timing belt, water pump, drive belts, coolant, and performed full inspection of the V6 engine.'
    }
  } */
  maintenanceController.createMaintenance
);

router.put(
  '/:id',
  isAuthenticated,
  /* #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: {
      vehicleModel: 'NSX',
      serviceType: 'Timing Belt and Water Pump Replacement',
      cost: 1900,
      mechanic: 'Acura Performance Specialists',
      mileage: 47500,
      serviceDate: '2026-05-29',
      notes: 'Updated NSX maintenance record after additional inspection.'
    }
  } */
  maintenanceController.updateMaintenance
);

router.delete('/:id', isAuthenticated, maintenanceController.deleteMaintenance);

module.exports = router;