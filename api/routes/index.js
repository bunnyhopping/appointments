var express = require('express');
var router = express.Router();
const ObjectID = require('mongodb').ObjectID;

router.get('/janappointments', (req, res, next) => {
  req.collection.find({})
    .toArray()
    .then(results => res.json(results))
    .catch(error => res.send(error));
});

router.post('/janappointments', (req, res, next) => {
  const { appointmentDate, name, email } = req.body;
  if (!appointmentDate || !name || !email) {
    return res.status(400).json({
      message: 'Appointment Date, Name and email are required',
    });
  }

  const payload = { appointmentDate, name, email };
  req.collection.insertOne(payload)
    .then(result => res.json(result))//Modificado por el MongoDB driver 4.x que ├║nicamente devuelve el ID generado
    .catch(error => res.status(400).json(
      { message: "No appointments available on that date" },
    ));
});

router.delete('/janappointments/:id', (req, res, next) => {
  const { id } = req.params;
  const _id = ObjectID(id);
  req.collection.deleteOne({ _id })
    .then(result => res.json(result))
    .catch(error => res.send(error));
});

module.exports = router;