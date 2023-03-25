const express = require("express")
const router = express.Router()
const connection = require('../db/connector');

function profile(req,res){
    const {userID,username, password, email, userrole} = req.body;
let getData =`Select * from newcustmer`
connection.query(getData, function(err, result){
    if (err){
        throw err;
    }
    return res.send(getData);
})
}



router.post('/', profile);

module.exports = router;