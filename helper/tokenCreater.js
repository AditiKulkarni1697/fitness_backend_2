const jwt = require('jsonwebtoken')
const {redis} = require ('../dataBase/redis')
require('dotenv').config()

async function tokenCreator(obj){
    let token = jwt.sign({ Client: obj._id, name:obj.name }, process.env.tokenSecretKey, { expiresIn:"1d"});

    let refresh_token = jwt.sign({ Client: obj._id,  name:obj.name}, process.env.refreshSecretKey, { expiresIn:"3d" });

    //await redisClient.hSet('token', obj.email, token)
    
    redis.sadd('token', obj.email,token)
  .then((addedCount) => {
    console.log(`Added ${addedCount} values to the set`);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

    //await redisClient.hSet("refresh_token", obj.email, refresh_token)
    redis.sadd('refresh_token', obj.email,refresh_token)
  .then((addedCount) => {
    console.log(`Added ${addedCount} values to the set`);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

    return {token, refresh_token}
}

module.exports = {tokenCreator}