const {Car} = require('./setup');

class  Cars{
    appendCar = (obj) => new Promise((resolve, reject) => {
        Car.create(obj).then(data=>{
            resolve(data);
        }).catch(e=>{
            reject({e});
        });
    });
    updateCar = (id,data) => new Promise((resolve, reject) => {
        Car.findOneAndUpdate({_id:id},data,{new:true}).then(result=>{
            resolve(result);
        }).catch(e=>{
            reject(e);
        });
    });
};

module.exports = new Cars;