const pushMessaege = require('./PushNotification');
const {Client,STO} = require('../DB/setup');


class PushNotification {
    CreateTask = (city,service,message) =>{
        STO.find({city,services:service}).then(data=>{

        }).catch(e=>{
            console.log(e);
        })
    };
};


module.exports = new PushNotification;