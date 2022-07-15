const jwt = require('jsonwebtoken');
const {jwt_secret} = require('../config.json');

verify_jwt = (token) => {
    let decode = jwt.verify(token,jwt_secret);
    return decode;
}

module.exports = verify_jwt;