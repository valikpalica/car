const {Client,Car,Task,STO} = require('./setup');


class Clients {
    append = (obj) => new Promise((resolve, reject) => {
        Client.create(obj).then(data=>{
            resolve(data);
        }).catch(e=>{
            reject(e);
        })
    });
    findByPhone = (number) => new Promise((resolve, reject) => {
        Client.findOne({number}).then(data=>{
            resolve(data);
        }).catch(e=>{
            reject(e);
        })
    });
    findCars = (number) => new Promise((resolve, reject) => {
        Client.find({number}).then(async(data)=>{
            if(data.length>0){
                let id = data[0].id;
                let cars = await Car.find({id_user:id});
                resolve(cars);
            }
            else{
                reject('person not found');
            }
        }).catch(e=>{
            reject(e);
        });
    });
    deleteCars = (id) => new Promise((resolve, reject) => {
        Car.deleteOne({_id:id}).then(data=>{
            resolve(data)
        }).catch(e=>{
            reject(e);
        })
    });
    updateClient = (id,data) => new Promise((resolve, reject) => {
        Client.findOneAndUpdate({_id:id},data,{new: true}).then(data=>{
            resolve(data);
        }).catch(e=>{
            reject(e);
        });
    });
    changeAppToken = (id,data) => new Promise((resolve, reject) => {
        Client.findOneAndUpdate({_id:id},{app_token:data},{new:true}).then(data=>{
            resolve(data);
        }).catch(e=>{
            reject(e);
        })
    });
    createTask = (obj) => new Promise((resolve, reject) => {
        Task.create(obj).then(data=>{
            resolve(data);
        }).catch(e=>{
            reject(e);
        });
    });
    disableAccount = (app_token) => new Promise((resolve, reject) => {
        Client.findOneAndUpdate({app_token},{app_token:null},{new:true}).then(data=>{
            resolve(data);
        }).catch(e=>{
            reject(e);
        })
    });
    getClientTask = (id_client) => new Promise((resolve, reject) => {
        Task.find({id_client}).then(data=>{
            resolve(data)
        }).catch(e=>{
            reject(e);
        });
    });
    deleteTask = (id) => new Promise((resolve, reject) => {
        Task.findOneAndRemove({_id:id}).then(data=>{
            resolve(data)
        }).catch(e=>{
            reject(e);
        })
    });
    cancelTask = (id,point) => new Promise((resolve, reject) => {
        Task.findOneAndUpdate({_id:id},{
            isActive:false,
            point,
        },{new:true}).then(data=>{
            resolve(data);
        }).catch(e=>{
            reject(e);
        })
    });
    checkSTOforTask = (id,id_sto) => new Promise((resolve, reject) => {
        Task.findOneAndUpdate({_id:id},{id_sto},{new:true}).then(async(data)=>{
            await STO.findOneAndUpdate({_id:id_sto},{$inc:{count:1}},{new:true});
            resolve(data);
        }).catch(e=>{
            reject(e);
        });
    });
    getInormationForTask = (id) => new Promise((resolve, reject) => {
        Task.findOne({_id:id_client}).then(data=>{
            resolve(data)
        }).catch(e=>{reject(e)});
    });
    getInformationFromSto = (id) => new Promise((resolve, reject) => {
        STO.findOne({_id:id}).then(data=>{
            resolve(data);
        }).catch(e=>{
            reject(e);
        })
    });
};

module.exports = new Clients;
