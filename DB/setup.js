const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect('mongodb+srv://valik:1111@cluster0.toa66.mongodb.net/?retryWrites=true&w=majority');

const ShemaSTO = new Schema({
    name:String,
    number:String,
    location:{
        title:String,
        latitude:String,
        longitude:String,
        _id:false,
    },
    email:{
        type:String,
        default:null,
    },
    services:[String],
    avatar:{
        type:String,
        default:null
    },
    app_token:{
        type:String,
        default:null
    },
    count:{
        type:Number,
        default:0
    }
});
const ShemaCars = new Schema({
    name:String,
    types:String,
    fuell:String,
    volume:String,
    year:Date,
    vinCode:String,
    id_user:String,
    
});
const ShemaClient = new Schema({
    name:String,
    surname:String,
    birthday:Date,
    sex:{
        type:String,
        default:null
    },
    number:String,
    avatar:{
        type:String,
        default:null
    },
    app_token:{
        type:String,
        default:null
    },
});
const ShemaVerify = new Schema({
    number:String,
    otp:String
});

const ShemaTask = new Schema({
    city:String,
    services:String,
    header:{
        type:String,
        default:null
    },
    text:{
        type:String,
        default:null
    },
    image:{
        type:String,
        default:null
    },
    point:{
        type:Number,
        default:null
    },
    time_client:{
        type:Date,
        default:null,
    },
    time_sto:{
        type:Date,
        default:null,
    },
    car_info:{
        name:String,
        types:String,
        volume:String,
        year:Date,
        vinCode:String,
    },
    id_client:String,
    client_info:{
        name:String,
        sex: String,
        number:String,
        avatar:String,
        app_token:String,
    },
    id_sto:{
        type:String,
        default:null
    },
    isActive:{
        type: Boolean,
        default:true
    },
    array_sto:{
        type:[{
            id_sto:String,
            cost:String,
            preliminary:Boolean,
            time:String,
            place:String,
            location:{
                title:String,
                latitude:String,
                longitude:String,
                _id:false,
            },
            number:String,
        }],
        default:[],
        _id:false
    }
});

const STO = mongoose.model('STO',ShemaSTO);
const Car = mongoose.model('Cars',ShemaCars);
const Client = mongoose.model('Client',ShemaClient);
const Verify = mongoose.model('Verify',ShemaVerify);
const Task  = mongoose.model('Task',ShemaTask);

module.exports = {
    STO,
    Car,
    Client,
    Verify,
    Task
}