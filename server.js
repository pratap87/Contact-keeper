 
const express = require('express');
const app = express();
const path = require('path');

app.set('port', process.env.port || 3000) 

app.get('/', (req, res, next) =>{
   res.json({msg:'welcome'})
})

app.use('/api/user',require('./routes/user'));
app.use('/api/contact',require('./routes/contact'));
app.use('/api/auth',require('./routes/auth'));
app.listen(app.get('port'), server =>{
    console.info(`Server listen on port ${app.get('port')}`);
})