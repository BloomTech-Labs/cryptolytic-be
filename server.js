const express = require('express');
const helmet = require('helmet');
const morgan = require("morgan");
const cors = require("cors");

const authRouter = require('./auth/auth-router');
const UserRouter = require('./users/user-router.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/users', UserRouter);

module.exports = server;
