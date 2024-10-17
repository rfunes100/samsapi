const express = require('express');
const router = express.Router();
const Movimiento = require('../models/Movimiento');

//const Vehiculo = require('../models/Vehiculo');



// Obtener todos los vehículos
router.get('/', async (req, res) => {
  try {
      const movimientos = await Movimiento.find().populate('idvehiculo').exec();
      res.json(movimientos);
  } catch (error) {
      console.error('Error fetching movements:', error);
      res.status(500).send('Server error');
  }
});


/* router.get('/', async (req, res) => {
  try {
    const vehiculoss = await Movimiento.find();
    console.log('Movimiento',vehiculoss)
    res.json(vehiculoss);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}); */

// Crear un nuevo vehículo
router.post('/', async (req, res) => {
  const movimiento = new Movimiento({
    idvehiculo: req.body.idvehiculo,
    tipomovimiento: req.body.tipomovimiento,
    fecha: req.body.fecha,
    hora: req.body.hora,
    kilometraje: req.body.kilometraje,
    motorista: req.body.motorista,
  });

  try {
    const nuevoVehiculo = await movimiento.save();
    res.status(201).json(nuevoVehiculo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener un vehículo por ID
router.get('/:id', getVehiculo, (req, res) => {
  res.json(res.vehiculo);
});

// Actualizar un vehículo
router.patch('/:id', getVehiculo, async (req, res) => {
  if (req.body.marca != null) {
    res.vehiculo.marca = req.body.marca;
  }
  if (req.body.modelo != null) {
    res.vehiculo.modelo = req.body.modelo;
  }
  if (req.body.placa != null) {
    res.vehiculo.placa = req.body.placa;
  }
  try {
    const updatedVehiculo = await res.Movimiento.save();
    res.json(updatedVehiculo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const vehiculo = await Movimiento.findByIdAndDelete(req.params.id);
    if (!vehiculo) return res.status(404).json({ message: 'Vehículo no encontrado' });
    res.json({ message: 'Vehículo eliminado', vehiculo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Eliminar un vehículo
/*
router.delete('/:id', getVehiculo, async (req, res) => {
  try {
    console.log('borrando ')

    await res.vehiculo.remove();
    res.json({ message: 'Vehículo eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
*/


// Middleware para obtener un vehículo por ID
async function getVehiculo(req, res, next) {
  let vehiculo;
  try {
    vehiculo = await Movimiento.findById(req.params.id);
    if (vehiculo == null) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.vehiculo = vehiculo;
  next();
}

module.exports = router;