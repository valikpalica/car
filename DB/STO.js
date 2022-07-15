const {STO} = require('./setup');


class STO_DB {
    create_STO = (obj) => new Promise((resolve, reject) => {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        obj['certificate'] = today;
        STO.create(obj).then(data=>{
            resolve(data);
        }).catch(e=>{
            reject(e);
        })
    });
    findByPhone = (number) => new Promise((resolve, reject) => {
        STO.findOne({number}).then(data=>{
            resolve(data);
        }).catch(e=>{
            reject(e);
        });
    });
    update = (_id,data) => new Promise((resolve, reject) => {
        STO.findOneAndUpdate({_id},data,{new:true}).then(result=>{
            resolve(result)
        }).catch(e=>{
            reject(e);
        });
    });
    changeAppToken = (id,data) => new Promise((resolve, reject) => {
        STO.findOneAndUpdate({_id:id},{app_token:data},{new:true}).then(data=>{
            resolve(data);
        }).catch(e=>{
            reject(e);
        })
    });
    disableAccount = (app_token) =>{
        STO.findOneAndUpdate({app_token},{app_token:null},{new:true}).then(data=>{
            resolve(data);
        }).catch(e=>{
            reject(e);
        });
    }
}

module.exports = new STO_DB;