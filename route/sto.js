const express = require('express');
const router = express.Router();
const Controller = require('../controller/controller');
const upload = require('./upload');

router.post('/updateSTO',upload.single('avatar'),Controller.updateSTO);
router.post('/disableAccountSTO',Controller.disableAccountSTO);
router.post('/prapareToChangeNumber',Controller.prapareToChangeNumber);
router.post('/changeNumber',Controller.changeNumber);
router.post('/appendServiceSTO',Controller.appendServiceSTO);
router.delete('/deleteServiceSTO',Controller.deleteServiceSTO);
router.post('/setParamsToTaskFromSTO',Controller.setParamsToTaskFromSTO);
router.post('/getTasksSTO',Controller.getTasksSTO);
router.post('/getHistoryForSTO',Controller.getHistoryForSTO);
router.post('/getMyTasksSTO',Controller.getMyTasksSTO);
router.post('/cancelTaskSTO',Controller.cancelTaskSTO);
router.post('/getInformationForTaskSTO',Controller.getInformationForTaskSTO);

module.exports = router;