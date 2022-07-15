const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');
const PORT = process.env.PORT || 8080;
const sto = require('./route/sto');
const client = require('./route/client');
const midleware = require('./midleware/checkUser');
const verification = require('./route/otp');

app.use(parser.urlencoded({extended:false}));
app.use(parser.json());

app.use('/',verification);

app.use('/main',midleware);
app.use('/static',express.static(path.join(__dirname,'public')));
app.use('/avatar',express.static(path.join(__dirname,'image')));
app.use('/taskImage',express.static(path.join(__dirname,'taskImage')));
app.use('/main/client',client);
app.use('/main/sto',sto);

app.listen(PORT,()=>{
    require('./DB/setup');
    console.log(`server has been started on port ${PORT}`);
});
