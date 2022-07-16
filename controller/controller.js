const otp = require('../services/otp');
const decodeOtp = require('../services/decodeOTP');
const jwt_sign = require('../services/jwt-sign');
const STO = require('../DB/STO');
const Car = require('../DB/Cars');
const Client = require('../DB/Client');
const Verifies = require('../DB/verify');
const {secret} = require('../config.json');


class Controller {
    OTPVerificationSTO = (req,res) =>{
        let {number} = req.body;
        let otp_token =  otp();
        Verifies.append(number,otp_token).then(async(data)=>{
            return {secret,data};
        }).then(data=>{
             //send message
            res.json({data})
        }).catch(e=>{
            res.status(400).json({e:e.message});
        })
    }
    OTPVerificationClient = (req,res) =>{
        let {number} = req.body;
        let otp_token =  otp();
        Verifies.append(number,otp_token).then(async(data)=>{
            return {secret,data};
        }).then(data=>{
             //send message
            res.json({data})
        }).catch(e=>{
            res.status(400).json({e:e.message});
        })
    };
    checkOTPClient = (req,res) =>{
        let {otp_token,number,status,app_token} = req.body;
        console.log(`${otp_token} ${number}  ${status}  ${app_token}`);
        Verifies.find(number).then(async(data)=>{
            if(data.length>0){
                let otp_verificarion = false;
                data.forEach(async (element) => {
                    if(decodeOtp(otp_token) === decodeOtp(element.otp)){
                        otp_verificarion = true;
                        await Verifies.delete(number);
                    }
                });
                console.log(`otp_verificarion ${otp_verificarion}`);
                if(otp_verificarion){
                        let jwt_token = jwt_sign(number);
                        let exist = false;
                        let data_obj;
                        if(status === "client"){
                            data_obj = await Client.findByPhone(number);
                            console.log(`data_obj ${data_obj}`);
                            if(data_obj){
                                exist = true;
                                if(data_obj.app_token!==app_token){
                                    await Client.changeAppToken(data_obj.id,app_token);
                                    data_obj.app_token = app_token
                                }
                            }
                            else{
                                res.status(200).json({text:'client not found',exist});
                            }
                        }
                        else if (status === 'sto'){
                            data_obj = await STO.findByPhone(number);
                            if(data_obj){ 
                                exist = true
                                if(data_obj.app_token!== app_token){
                                    await STO.changeAppToken(data_obj.id,app_token);
                                    data_obj.app_token = app_token
                                }
                            }
                            else{
                                res.status(200).json({text:'sto not found',exist});
                            }
                        }
                        else{
                            throw new Error('status not found');
                        }
                        res.status(200).json({jwt_token,data_obj,exist});
                }
                else{
                    throw new Error('token not equal');
                }
            }
            else{
                throw new Error('number not found');
            }
        }).catch(e=>{
            res.status(400).json({e:e.message});
        })
    };
    createSTO = (req,res) =>{
        let {number} = req.body;
        STO.findByPhone(number).then(async(data)=>{
            if(data){
                res.status(400).json({information:"STO exist"});
            }
            else{
                let obj = req.body;
                if(req.file){
                    obj['avatar'] = req.file.filename;
                }
                let sto = await STO.create_STO(obj);
                let token = jwt_sign(number);
                res.status(200).json({sto,token});
            }
        }).catch(e=>{
            res.status(400).json({e:e.message});
        })
    }
    appendClient = (req,res) =>{
        let {number} = req.body;
        Client.findByPhone(number).then(async(data)=>{
            if(data){
                res.status(400).json({information:"person exist"});
            }
            else{
                let obj = req.body;
                if(req.file){
                    obj['avatar'] = req.file.filename;
                }
                let client = await Client.append(obj);
                let token = jwt_sign(number);
                res.json({client,token});
            }
        }).catch(e=>{
            res.status(400).json({e:e.message});
        })
    };
    appendCar = (req,res) =>{
        let {number,car} = req.body;
        Client.findByPhone(number).then(data=>{
            if(data){
                car['id_user'] = data.id;
                return car;
            }
            else{
                res.status(400).json({text:'number not found',exist:false});
            }
        }).then(async(data)=>{
                let result = await Car.appendCar(data);
                res.status(200).json({result});
        }).catch(e=>{
            res.status(400).json({e:e.message});
        });
        res.status(200);
    };
    getCars = (req,res) =>{
        let {number} = req.body;
        Client.findCars(number).then(data=>{
            res.status(200).json({data});
        }).catch(e=>{
            res.status(400).json({e:e.message});
        })
    }
    deleteCars = (req,res) =>{
        let {id} = req.body;
        Client.deleteCars(id).then(data=>{
            res.status(200).json({data});
        }).catch(e=>{
            res.status(400).json({e:e.message});
        })
    }
    updateCar = (req,res) =>{
        let {id,data} = req.body;
        Car.updateCar(id,data).then(result=>{
            res.status(200).json({data:result});
        }).catch(e=>{
            res.status(400).json({e:e.message});
        });
    };
    updateClient = (req,res) =>{
        let {id,data} = req.body;
        if(req.file){
            data['avatar'] = req.file.filename;
        }
        Client.updateClient(id,data).then(data=>{
            res.status(200).json({data});
        }).catch(e=>{
            res.status(400).json({e:e.message});
        })
    }

    updateAdmin = (req,res) =>{
        let {id,data} = req.body;
        if(req.file){
            data['avatar'] = req.file.filename;
        }
        STO.update(id,data).then(data=>{
            res.status(200).json({data})
        }).catch(e=>{
            res.status(400).json({e:e.message});
        });
    };
    createTask = (req,res) =>{
        let data = req.body;
        if(req.file){
            data['image'] = req.file.filename;
        }
        data['time_client'] = new Date(data['time_client']);
        Client.createTask(data).then(data=>{
            res.status(200).json({data});
        }).catch(e=>{
            res.status(400).json({e:e.message})
        })
    };
    disableAccountClient = (req,res) =>{
        let {app_token} = req.body;
        Client.disableAccount(app_token).then(data=>{
            res.status(200).json({data});
        }).catch(e=>{
            res.status(400).json({e:e.message});
        });
    };
    disableAccountSTO = (req,res) =>{
        let {app_token} = req.body;
        STO.disableAccount(app_token).then(data=>{
            res.status(200).json({data});
        }).catch(e=>{
            res.status(400).json({e:e.message});
        })
    }
    getMyTask = (req,res) =>{
        let {id_client} = req.body;
        Client.getClientTask(id_client).then(data=>{
            res.status(200).json({data});
        }).catch(e=>{
            res.status(400).json({e:e.message});
        })
    }
    getTask = (req,res)=>{
        let {id} = req.body;
        Client.getInormationForTask(id).then(data=>{
            res.status(200).json({data});
        }).catch(e=>{
            res.status(400).json({e:e.message});
        })
    };
    cancelTask = (req,res) =>{
        let {id,point} = req.body
        Client.cancelTask(id,point).then(data=>{
            res.status(200).json({data})
        }).catch(e=>{
            res.status(400).json({e:e.message});
        })
    };
    deleteTask = (req,res) =>{
        let {id} = req.body
        Client.deleteTask(id).then(data=>{
            res.status(200).json({data});
        }).catch(e=>{
            res.status(400).json({e:e.message});
        });
    };
    checkSTOforTask = (req,res) =>{
        let {id,id_sto} = req.body
        Client.checkSTOforTask(id,id_sto).then(data=>{
            res.status(200).json({data});
        }).catch(e=>{
            res.status(200).json({e:e.message});
        });
    };
    prapareToChangeNumber = (req,res) =>{
        let {number,status} = req.body;
        let otp_token = otp();
        if(status==='client'){
            Client.findByPhone(number).then(async(result)=>{
                if(!result){
                   let data  = await Verifies.append(number,otp_token);
                   //send Message
                    res.status(200).json({data});
                }else{
                    res.status(400).json({e:'user exist'});
                }
            }).catch(e=>{
                res.status(400).json({e:e.message});
            });
        }
        else if(status === 'sto'){
            STO.findByPhone(number).then(async(result)=>{
                if(!result){
                    let data = await Verifies.append(number,otp_token);
                    // send Message
                    res.status(200).json({data});
                }
                else{
                    res.status(400).json({e:'user exist'});
                }
            }).catch(e=>{
                res.status(400).json({e:e.message});
            });
        }
        else{
            res.status(400).json({e:'status user not found'});
        }
    };
    changeNumber = (req,res) =>{
        let {otp_token,id_user,status,number} = req.body;
        Verifies.find(number).then(data=>{
            data.forEach(async(element) => {
                if(decodeOtp(otp_token)===decodeOtp(element.otp)){
                   await Verifies.delete(number);
                }
                else{
                    res.status(400).json({e:'otp code not found'});
                }
            });
            if(status==='client'){
                Client.updateClient(id_user,{number}).then(data=>{
                    res.status(200).json({data});
                }).catch(e=>{
                    res.status(400).json({e:e.message});
                })
            }else if(status === 'sto'){
                STO.update(id_user,{number}).then(data=>{
                    res.status(200).json({data});
                }).catch(e=>{
                    res.status(400).json({e:e.message});
                });
            }
            else{
                res.status(400).json({e:'status not found'});
            }
        }).catch(e=>{
            res.status(400).json({e:e.message});
        });
    };
    getInormationForSTO = (req,res) =>{
        let {id} = req.body;
        Client.getInformationFromSto(id).then(data=>{
            res.status(200).json({data});
        }).catch(e=>{
            res.status(400).json({e:e.message});
        });
    };
};


module.exports = new Controller;
