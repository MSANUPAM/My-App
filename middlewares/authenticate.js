const jwt = require('jsonwebtoken');
const variables = require('../constants/variables');

module.exports =  function authenticate(req, res, next) {
    const {userName, password} = req.body;
    console.log(req.headers['x-access-token']);
    let token = req.headers['x-access-token'] || 'random';
    jwt.verify(token, variables.accessTokenSecret, (err, user)=>{
        if (err) {
            res.status(403);
            // return res.send({message: 'Unauthorized'});
        } else {
            req.headers['user'] = user;
        }
    })
    next();
}