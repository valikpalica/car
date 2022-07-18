const otpGenerator = require('otp-generator');
const CryptoJS = require('crypto-js');
const {secret} = require('../config.json');

generateOTP = () =>{
    const otp = otpGenerator.generate(4,{
        specialChars:false,
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
    });
    //const hash = CryptoJS.AES.encrypt(otp,secret).toString();
    return otp
}

module.exports = generateOTP;




