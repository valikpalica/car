const express = require('express');
const jwt_verify = require('../services/jwt_verify');
const jwt_sign = require('../services/jwt-sign');
const midleware = express();

midleware.use('/',(req,res,next)=>{
    try {
        let token = req.headers.authorization.split(' ')[1];
        let verify = jwt_verify(token);
        if(verify){
            let {phone} = req.body;
            let hash = jwt_sign(phone);
            let new_token = `Bearer ${hash}`;
            res.set('Authorization',new_token);
            next();
        }
        else{
            throw new Error(verify);
        }
    } catch (error) {
        res.json({data:'jwt extined'});
    }
    
});


module.exports = midleware;