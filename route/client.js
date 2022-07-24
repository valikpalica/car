const router = require('express').Router();
const Controller = require('../controller/controller');
const upload = require('../upload');
const uploadTask = require('./uploadTaskImage');

router.put('/appendCar',Controller.appendCar);
router.post('/getCars',Controller.getCars);
router.delete('/deleteCar',Controller.deleteCars);
router.post('/updateClient',upload.single('avatar'),Controller.updateClient);
router.post('/updateCar',Controller.updateCar);
router.post('/createTask',uploadTask.single('taskImage'),Controller.createTask);
router.post('/disableAccount',Controller.disableAccountClient);
router.delete('/deleteAccount',Controller.deleteAccountClient);
router.delete('/deleteTask',Controller.deleteTaskClient);
router.post('/setPoint',Controller.setPointClient);
router.post('/setSTOforTask',Controller.setSTOforTaskClient);
router.post('/prepateToChangeNumber',Controller.prapareToChangeNumber);
router.post('/changeNumber',Controller.changeNumber);
router.post('/getMyTasks',Controller.getMyTaskClient);
router.post('/getTask',Controller.getTaskClient);
router.post('/getInormationForSTO',Controller.getInormationForSTO)

module.exports = router;