const multer = require('multer');
const paht = require('path');
let destination = paht.join(__dirname,'image');

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,destination);
    },
    filename: (req,file,cb)=>{
        //let name = Date.now().toString().replace(/:/g,'-')+file.originalname;
        let name = file.originalname;
        cb(null,name);
    }
});
const upload = multer({storage});

module.exports = upload;