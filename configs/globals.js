//require and initializing dotenv
require("dotenv").config();
// create a configuration object
const configurations ={
    ConnectionStrings:{
        MongoDb: process.env.CONNECTION_STRING_MONGODB
    }
}
//export the configuration object
module.exports =configurations;