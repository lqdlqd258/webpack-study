//express nodejs框架
let express = require('express');
let app = express();
app.get('/user',(req,res)=>{
    res.json({name:'ljc',age:'24'});
});
app.listen(3000);