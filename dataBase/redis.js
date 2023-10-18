// const Redis = require("ioredis");
// 

import { createClient } from 'redis';
require("dotenv").config();

const client = createClient({
    password: process.env.redis_password,
    socket: {
        host: process.env.redis_host,
        port: process.env.redis_port
    }
});

module.exports = { client };
