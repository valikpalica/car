const multer = require('multer');
const paht = require('path');
let destination = paht.join(__dirname,'../','image');

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,destination);
    },
    filename: (req,file,cb)=>{
        
        cb(null,Date.now().toISOString().replace(/:/g, '-')+'-'+file.filename);
    }
});
const upload = multer({storage});

module.exports = upload;