const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const User=require('../models/user');
router.post('/',(req,res)=>{
    res.send(req.body)
});


module.exports = router;