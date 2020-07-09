const cors=require('cors');
const express = require('express');
const app = express();
const connectDB=require('./config/db')
const bcrypt=require('bcryptjs');
connectDB();
app.use(cors({credentials: true, origin: true}));
app.use(express.json({extended:false}))
app.set('port', process.env.port || 5000) 

app.get('/', (req, res, next) =>{
   res.json({msg:'welcome'})
})

app.use('/api/users',require('./routes/users'));
app.use('/api/contacts',require('./routes/contact'));
app.use('/api/auth',require('./routes/auth'));
app.listen(app.get('port'), server =>{
    console.info(`Server listen on port ${app.get('port')}`);
})