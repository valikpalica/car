let admin = require('./initialize');


const notificationOption = {
    priority:"high",
    timeToLive:60*60*24
}

const PushNotification = async (token,message) => {
    let result = await admin.messaging().sendToDevice(token,message,notificationOption);
    return result;
};

module.exports = PushNotification;