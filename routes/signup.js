const express = require("express")
const router = express.Router();
const connection = require('../db/connector');

function Signup(req, res) {
    const {username, password, email, userrole} = req.body;
    let userId = Math.floor(Math.random()*1000);
    // console.log(userId);

    let insertQuery = `Insert into newcustomer(USERID, NAME, EMAIL, PASSWORD, ROLE) values(${userId}, '${username}', '${email}', '${password}', '${userrole}')`;
    connection.query(insertQuery, function (err, result) {
        if (err){
            throw err;
        }
        return res.send({'userId':userId});
    });
}

router.post('/', Signup);
module.exports = router;