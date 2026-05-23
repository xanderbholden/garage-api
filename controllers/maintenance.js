const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const validateMaintenance = (record) => {
  const requiredFields = [
    'vehicleModel',
    'serviceType',
    'cost',
    'mechanic',
    'mileage',
    'serviceDate',
    'notes'
  ];

  return requiredFields.filter((field) => !record[field]);
};

const getAll = async (req, res) => {
  try {
    const records = await mongodb.getDb().collection('maintenance').find().toArray();
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const recordId = new ObjectId(req.params.id);
    const record = await mongodb.getDb().collection('maintenance').findOne({ _id: recordId });

    if (!record) {
      return res.status(404).json({ error: 'Maintenance record not found' });
    }

    res.status(200).json(record);
  } catch (err) {
    res.status(400).json({ error: 'Invalid maintenance ID' });
  }
};

const createMaintenance = async (req, res) => {
  try {
    const record = req.body;
    const missingFields = validateMaintenance(record);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Missing required fields',
        missingFields
      });
    }

    const response = await mongodb.getDb().collection('maintenance').insertOne(record);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateMaintenance = async (req, res) => {
  try {
    const recordId = new ObjectId(req.params.id);
    const record = req.body;
    const missingFields = validateMaintenance(record);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Missing required fields',
        missingFields
      });
    }

    const response = await mongodb
      .getDb()
      .collection('maintenance')
      .replaceOne({ _id: recordId }, record);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Maintenance record not found or no changes made' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Invalid maintenance ID' });
  }
};

const deleteMaintenance = async (req, res) => {
  try {
    const recordId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .collection('maintenance')
      .deleteOne({ _id: recordId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Maintenance record deleted successfully' });
    } else {
      res.status(404).json({ error: 'Maintenance record not found' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Invalid maintenance ID' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance
};