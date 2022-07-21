const {STO, Task} = require('./setup');


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
    findById = (id) => new Promise((resolve, reject) => {
        STO.findOne({_id:id}).then(data=>{
            resolve(data);
        }).catch(e=>{
            reject(e);
        });
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
    disableAccount = (app_token) => new Promise((resolve, reject) =>{
        STO.findOneAndUpdate({app_token},{app_token:null},{new:true}).then(data=>{
            resolve(data);
        }).catch(e=>{
            reject(e);
        });
    });
    getTasks = (city,services) => new Promise((resolve, reject) => {
        Task.find({city:city,isActive:true,services:services}).then(data=>{
            resolve(data);
        }).catch(e=>{
            reject(e);
        })
    });
    history = (id) => new Promise((resolve, reject) => {
        Task.find({isActive:false,id_sto:id}).then(data=>{
            resolve(data);
        }).catch(e=>{
            reject(e);
        })
    });
    getMyTask = (id) => new Promise((resolve, reject) => {
        Task.find({id_sto:id,isActive:true}).then(data=>{
            resolve(data);
        }).catch(e=>{
            reject(e);
        });
    });
    appendServices = (id,service) => new Promise((resolve, reject) => {
        STO.findOneAndUpdate({_id:id},{$push:{services:service}},{new:true}).then(data=>{
            resolve(data);
        }).catch(e=>{
            reject(e);
        })
    });
    deleteServices = (id,service) => new Promise((resolve, reject) => {
        STO.findOneAndUpdate({_id:id},{$pull:{services:{$in:[service]}}},{new:true}).then(data=>{
            resolve(data);
        }).catch(e=>{
            reject(e);
        });
    });
    SetParametersToTask = (id_task,data) => new Promise((resolve, reject) => {
        Task.findOneAndUpdate({_id:id_task},{$push:{array_sto:data}},{new:true}).then(data=>{
            resolve(data);
        }).catch(e=>{
            reject(e);
        })
    });
    cancelTask = (id_task) => new Promise((resolve, reject) => {
        Task.findOneAndUpdate({_id:id_task},{isActive:false},{new:true}).then(data=>{
            resolve(data);
        }).catch(e=>{
            reject(e);
        })
    });
    getInformationForTask = (id_task) => new Promise((resolve, reject) => {
        Task.findOne({_id:id_task}).then(data=>{
            resolve(data);
        }).catch(e=>{
            reject(e);
        });
    });
}

module.exports = new STO_DB;