const {Verify} = require('./setup');

class Verifies {
    append = (number,otp) => new Promise((resolve, reject) => {
        Verify.create({number,otp}).then(data=>{
            resolve(data);
        }).catch(e=>{
            reject(e);
        });
    });
    delete = (number) => new Promise((resolve, reject) => {
        Verify.deleteOne({number}).then(data=>{
            resolve(data);
        }).catch(e=>{
            reject(e)
        })
    });
    find = (number) => new Promise((resolve, reject) => {
        Verify.find({number}).then(data=>{
            resolve(data);
        }).catch(e=>{
            reject(e);
        });
    });

};


module.exports = new Verifies()