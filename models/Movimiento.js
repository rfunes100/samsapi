const mongoose = require('mongoose');

const movimientoSchema = new mongoose.Schema({
  idvehiculo: {
    type: String,
 //   type: Schema.Types.ObjectId,
   // ref: 'Vehiculo',
    required: true
  },
  tipomovimiento: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  hora: { // Campo para la hora
    type: String,
    required: true
  },
  kilometraje: { // Campo para el kilometraje
    type: Number,
    required: true
  },
  motorista: {
    type: String,
    required: true
  },
});

const Movimiento = mongoose.model('Movimiento', movimientoSchema);
module.exports = Movimiento;

