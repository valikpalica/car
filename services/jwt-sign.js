const jwt = require('jsonwebtoken');
const {jwt_secret} = require('../config.json')


create_jwt = (phone) => {
    let token = jwt.sign({
        phone
    },jwt_secret,{expiresIn:'24h'});
    return token;
}


module.exports = create_jwt;