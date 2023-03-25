const express = require("express");
const router = express.Router();
const connect = require("../db/connector");
const userController = require('../controllers/users');

router.get('/', (req, res) => {
    let user = req.headers['user'];
    if (!user) {
        return res.status(401).send({message:'Unauthorized!'});
    }
    if (user['userRole']?.toLowerCase()!=='admin') {
        return res.status(401).send({message:'Unauthorized to view all users list, change role to admin to view!'});
    }
    userController.getUsers(connect, (err, userList)=>{
        if (err) {
            console.error(err);
        }
        return res.send({users: userList});
    });
    
})
router.get('/:userId', getSingleUser)

function getSingleUser(req, res) {
    let userList;
    let userId = String(req.params.userId);
    const filterUser = (err, userList)=>{
        if (err) {console.error(err)};
        for (let i = 0; i < userList.length; i++) {
            if (userList[i]['userId'] == userId) {
               return res.send(userList[i]);
            }
        }
        return res.send({});
    }
    userController.getUsers(connect, filterUser)


}

function updateUser(req, res) {
    let user = req.body;
    let userId = req.params.userId;
    user['userId'] = userId;
    userController.updateUser(connect, (err, result)=>{
        if (err) {
            return res.send({error:err, updatedData: null});
        }
        return res.send({error:null, updatedData: user});
    },user);
}

router.put('/:userId', updateUser);

function deleteUser(req,res){
    let userId= req.params.userId;
    userController.deleteUser(connect,(err, result)=>{
        if(err){
            console.log(userId)
            return res.send({error: err, deletedUser: null });
        }
        return res.send({error: err, deletedUser: userId});
    }, userId);
}

router.delete('/:userId', deleteUser);

module.exports = router;