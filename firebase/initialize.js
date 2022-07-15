let admin  = require('firebase-admin');
let serviceAccount  = require('./fastfix-2a170-firebase-adminsdk-6nrsh-e5d9c13a24.json');

admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
})

module.exports = admin;