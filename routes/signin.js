
const express = require("express")
const router = express.Router()
const signinController = require("../controllers/signin");
const connect = require("../db/connector");

function signin(req, res) {
   const { userName, password } = req.body;
   console.log(userName, password);
   signinController.signin(connect, (err, response) => {
      return res.send({ error:err?.message, response: response });
   }, userName, password);
}
router.post('/', signin);

module.exports = router;