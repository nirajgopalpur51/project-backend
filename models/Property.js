const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: String,
  location: String,
  price: Number,
  type: String,
  description: String,
});

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
