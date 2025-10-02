const mongoose = require('mongoose');

const DrawingSchema = new mongoose.Schema({
  name: String,
  data: Object  // Adjust fields for your canvas data
});

module.exports = mongoose.model('Drawing', DrawingSchema);
