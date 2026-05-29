const express = require('express');
const router = express.Router();

const maintenanceController = require('../controllers/maintenance');
const isAuthenticated = require('../middleware/authenticate');

// Public routes
router.get('/', maintenanceController.getAll);
router.get('/:id', maintenanceController.getSingle);

// Protected routes
router.post('/', isAuthenticated, maintenanceController.createMaintenance);
router.put('/:id', isAuthenticated, maintenanceController.updateMaintenance);
router.delete('/:id', isAuthenticated, maintenanceController.deleteMaintenance);

module.exports = router;