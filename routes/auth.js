const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const auth=require('../middleware/auth');   
const bcrypt = require('bcryptjs');
const config = require('config');

const User = require('../models/user');

router.get('/', auth,async(req, res) => {

    try {
        const user=await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (err ) {
         console.error(err.message);
         res.status(500).send('server error')
    }
    res.send("Get Logged user")
});



router.post('/', [check('email','please include a valid email').isEmail(),
check('password','password is required').exists()
],
 
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email,password}=req.body;
    try {
        let user= await User.findOne({email });
        if(!user){
            return res.status(400).json({msg:'Invalid Credentials'});
        }
        
        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({msg:'Invalid Credentials'});
        }
        const payload={
            user:{
                id:user.id
            }
        }
            jwt.sign(payload,config.get('jwtSecret'),{
                expiresIn:360000
            },(err,token)=>{
                if(err)
                throw err;
                res.json({token});
            }) 
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
    }
   
});


module.exports = router;