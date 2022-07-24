const router = require('express').Router();
const Controller = require('../controller/controller');
const upload = require('../upload');

router.post('/OTPSTO',Controller.OTPVerificationSTO);
router.post('/OTPClient',Controller.OTPVerificationClient);
router.post('/OTPCheck',Controller.checkOTPClient);
router.post('/saveSTO',upload.single('avatar'),Controller.createSTO);
router.post('/appendClient',upload.single('avatar'),Controller.appendClient);

module.exports = router;