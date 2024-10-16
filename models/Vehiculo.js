const mongoose = require('mongoose');

const vehiculoSchema = new mongoose.Schema({
  marca: {
    type: String,
    required: true
  },
  modelo: {
    type: String,
    required: true
  },
  placa: {
    type: String,
    required: true,
    unique: true
  }
});

const Vehiculo = mongoose.model('Vehiculo', vehiculoSchema);
module.exports = Vehiculo;

