const express = require('express');
const router = express.Router();
const Vehiculo = require('../models/Vehiculo');

//const Vehiculo = require('../models/Vehiculo');



// Obtener todos los vehículos
router.get('/', async (req, res) => {
  try {
    const vehiculoss = await Vehiculo.find();
    console.log('vehiculos',vehiculoss)
    res.json(vehiculoss);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear un nuevo vehículo
router.post('/', async (req, res) => {
  const vehiculo = new Vehiculo({
    marca: req.body.marca,
    modelo: req.body.modelo,
    placa: req.body.placa
  });

  try {
    const nuevoVehiculo = await vehiculo.save();
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
    const updatedVehiculo = await res.vehiculo.save();
    res.json(updatedVehiculo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByIdAndDelete(req.params.id);
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
    vehiculo = await Vehiculo.findById(req.params.id);
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