const express = require('express');

const playerController = require('../controller/player')

 const router = express.Router();


router.post('/submit', playerController.createPlayer);

router.get('/search/:playerName', playerController.searchPlayerByName);

router.put('/update/:id', playerController.updatePlayer);

module.exports = router;