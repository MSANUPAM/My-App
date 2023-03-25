const express = require("express")
const userRouter = require('./routes/users');
const signupRouter = require('./routes/signup');
const profileRouter = require('./routes/profile');
const signinRouter = require('./routes/signin');
const bodyParser = require('body-parser');
const cors = require('cors');
const authenticate = require('./middlewares/authenticate');

const app = express();

app.set('view engine', 'ejs');

app.use(cors());
app.use(bodyParser.json());

app.use('/users', authenticate ,userRouter);
app.use('/signup', signupRouter);
app.use('/signin', signinRouter);
app.listen(4000);