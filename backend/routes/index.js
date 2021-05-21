const { Router } = require('express');

const authentication= require ("./authentication.js");
const users= require("./users.js");
const notes= require("./notes.js");
const tags= require("./tags.js");
const collections= require ("./collections.js");
const guest= require ("./guest.js");

const server = Router();

server.use('/auth', authentication);
server.use('/user', users);
server.use('/note', notes);
server.use('/tag', tags);
server.use('/collection', collections);
server.use('/guest', guest);

module.exports = server;