require('./config/db')

const express = require('express');
const app = express();
const port = process.env.PORT || 2003;

const userRouter = require('./api/user')

const bodyParser = require('express').json;
app.use(bodyParser());

app.use('/user', userRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});