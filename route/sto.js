const express = require('express');
const router = express.Router();
const Controller = require('../controller/controller');
const upload = require('./upload');

router.post('/updateSTO',upload.single('avatar'),Controller.updateAdmin);


module.exports = router;