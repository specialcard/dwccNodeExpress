const express = require('express');
const app = express();
const port = 5000;

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dkel418:rla2578@kimhd.f0s1k.mongodb.net/myFirstDatabase?retryWrites=true&w=majorityd',{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false,
}).then(()=>console.log('mongoDb Connected....'))
.catch(e=>console.log(`${e}에러났습니다.`))



app.get('/',(req,res)=> res.send('hellow'));
app.listen(port, ()=> console.log(`hello ${port}`));
