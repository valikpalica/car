const multer = require('multer');
const paht = require('path');
let destination = paht.join(__dirname,'../','image');
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,destination);
    },
    filename: (req,file,cb)=>{
        const prefix  = Date.now();
        cb(null,file.filename+'-'+prefix);
    }
});
const upload = multer({storage});

module.exports = upload;