const express = require('express');
const router = express.Router();

const vehiclesController = require('../controllers/vehicles');
const isAuthenticated = require('../middleware/authenticate');

router.get('/', vehiclesController.getAll);
router.get('/:id', vehiclesController.getSingle);

router.post('/', isAuthenticated, (req, res) => {
  /* #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: {
      make: 'Subaru',
      model: 'WRX Premium',
      year: 2022,
      color: 'WR Blue Pearl',
      vin: 'JF1VBAA61N9012345',
      mileage: 16000,
      fuelType: 'Premium Gasoline',
      transmission: 'Manual',
      owner: 'Xander Holden'
    }
  } */
  vehiclesController.createVehicle(req, res);
});

router.put('/:id', isAuthenticated, (req, res) => {
  /* #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: {
      make: 'Subaru',
      model: 'WRX Premium',
      year: 2022,
      color: 'WR Blue Pearl',
      vin: 'JF1VBAA61N9012345',
      mileage: 16500,
      fuelType: 'Premium Gasoline',
      transmission: 'Manual',
      owner: 'Xander Holden'
    }
  } */
  vehiclesController.updateVehicle(req, res);
});

router.delete('/:id', isAuthenticated, vehiclesController.deleteVehicle);

module.exports = router;