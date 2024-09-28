require('./config/db')

const express = require('express');
const app = express();
const port = 1310

const userRouter = require('./api/User')

const bodyParser = require('express').json;
app.use(bodyParser());

app.use('/user', userRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});