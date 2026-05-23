const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const validateVehicle = (vehicle) => {
  const requiredFields = [
    'make',
    'model',
    'year',
    'color',
    'vin',
    'mileage',
    'fuelType',
    'transmission',
    'owner'
  ];

  return requiredFields.filter((field) => !vehicle[field]);
};

const getAll = async (req, res) => {
  try {
    const vehicles = await mongodb.getDb().collection('vehicles').find().toArray();
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const vehicleId = new ObjectId(req.params.id);
    const vehicle = await mongodb.getDb().collection('vehicles').findOne({ _id: vehicleId });

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    res.status(200).json(vehicle);
  } catch (err) {
    res.status(400).json({ error: 'Invalid vehicle ID' });
  }
};

const createVehicle = async (req, res) => {
  try {
    const vehicle = req.body;
    const missingFields = validateVehicle(vehicle);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Missing required fields',
        missingFields
      });
    }

    const response = await mongodb.getDb().collection('vehicles').insertOne(vehicle);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const vehicleId = new ObjectId(req.params.id);
    const vehicle = req.body;
    const missingFields = validateVehicle(vehicle);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Missing required fields',
        missingFields
      });
    }

    const response = await mongodb
      .getDb()
      .collection('vehicles')
      .replaceOne({ _id: vehicleId }, vehicle);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Vehicle not found or no changes made' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Invalid vehicle ID' });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const vehicleId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .collection('vehicles')
      .deleteOne({ _id: vehicleId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Vehicle deleted successfully' });
    } else {
      res.status(404).json({ error: 'Vehicle not found' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Invalid vehicle ID' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createVehicle,
  updateVehicle,
  deleteVehicle
};