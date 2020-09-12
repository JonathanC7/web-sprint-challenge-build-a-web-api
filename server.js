const express = require('express');

const projectsRouter = require('./data/seeds/03-projectsRouter.js');
const actionsRouter = require('./data/seeds/04-actionsRouter.js');

const server = express();

server.use(express.json());
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

module.exports = server;