const multer = require('multer');
const path = require('path');
let destination = path.join(__dirname,'../','taskImage');
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,destination)
    },
    filename:(req,file,cb)=>{
        let name = Date.now().toString().replace(/:/g,'-')+file.originalname;
        cb(null,name);
    }
});

const upload = multer({storage});

module.exports = upload;