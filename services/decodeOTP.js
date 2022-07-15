const CryptoJS = require('crypto-js');
const {secret} = require('../config.json');

decodeOTP = (otp) =>  {
    try {
        let bytes = CryptoJS.AES.decrypt(otp,secret);
        let data = bytes.toString(CryptoJS.enc.Utf8);
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = decodeOTP;