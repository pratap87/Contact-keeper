const express = require('express');
const router = express.Router();


router.post('/',(req,res)=>{
    res.send("Registered a user")
});


module.exports = router;