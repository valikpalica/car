const router = require('express').Router();
const Controller = require('../controller/controller');
const upload = require('./upload');
const uploadTask = require('./uploadTaskImage');

router.put('/appendCar',Controller.appendCar);
router.post('/getCars',Controller.getCars);
router.delete('/deleteCar',Controller.deleteCars);
router.post('/updateClient',upload.single('avatar'),Controller.updateClient);
router.post('/updateCar',Controller.updateCar);
router.post('/createTask',uploadTask.single('taskImage'),Controller.createTask);
router.post('/disableAccount',Controller.disableAccountClient);
router.delete('/deleteTask',Controller.deleteTask);
router.post('/cancelTask',Controller.cancelTask);
router.post('/setSTOforTask',Controller.checkSTOforTask);
router.post('/prepateToChangeNumber',Controller.prapareToChangeNumber);
router.post('/changeNumber',Controller.changeNumber);

module.exports = router;