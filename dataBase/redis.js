const Redis = require("ioredis");
require("dotenv").config();

// const redisClient = redis.createClient({
//   host: "localhost",
//   password: "",
//   port: 6379,
// });

// redisClient.connect(); //temperory changes


// redisClient.on("error", (error) => {
//   console.log(error.message);
// });
// redisClient.on("connect", () => {
//   console.log("Connected to the redis cloud");
// });

const redis = new Redis({
  host: 'localhost', // Redis server host (default is 'localhost')
  port: 6379,        // Redis server port (default is 6379)
  password: '', // Your Redis password (if set)
  db: 0              // Redis database index (default is 0)
});

module.exports = { redis };
