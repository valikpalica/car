const multer = require('multer');
const paht = require('path');
let destination = paht.join(__dirname,'../','image');

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        console.log(`destination`);
        console.log(destination);
        cb(null,destination);
    },
    filename: (req,file,cb)=>{
        console.log(file);
        //let name = Date.now().toString().replace(/:/g,'-')+file.originalname;
        let name = file.originalname;
        cb(null,name);
    }
});
const upload = multer({storage});

module.exports = upload;