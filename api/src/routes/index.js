// routes/index.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const chargerController = require('../controllers/chargerController');
const sessionController = require('../controllers/sessionController');


router.get('/chargers', chargerController.getAllChargers);

router.get('/chargers/:id([a-zA-Z0-9-]+)', chargerController.getChargerById);

router.post('/chargers', chargerController.createCharger);

router.patch('/chargers/:id([a-zA-Z0-9-]+)', chargerController.updateChargerById);

router.delete('/chargers/:id([a-zA-Z0-9-]+)', chargerController.deleteChargerById);

router.post('/chargers/search', chargerController.getChargersByFilter);

router.post('/chargers/count', chargerController.getChargerCount);

router.post('/session/reserve', sessionController.reserveCharger);

router.post('/session/connect', sessionController.connectCharger);

router.get('/users', userController.getUsers);

router.get('/users/:id([a-zA-Z0-9-]+)', userController.getUserById);

router.post('/users/email', userController.getUserByEmail);

router.post('/users', userController.createUser);

router.patch('/users/:id([a-zA-Z0-9-]+)', userController.updateUserById);

router.delete('/users/:id([a-zA-Z0-9-]+)', userController.deleteUserById);


module.exports = router;