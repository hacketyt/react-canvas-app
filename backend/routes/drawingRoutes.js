// routes/drawingRoutes.js
const express = require('express');
const router = express.Router();
const Drawing = require('../models/Drawing');

// Create a new drawing
router.post('/', async (req, res) => {
  try {
    const drawing = new Drawing(req.body);
    await drawing.save();
    res.status(201).send(drawing);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all drawings
router.get('/', async (req, res) => {
  try {
    const drawings = await Drawing.find();
    res.send(drawings);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
