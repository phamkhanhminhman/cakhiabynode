'use strict';

let constant = {
    
    "STATUS_LOG": true,

    //Token config
    "TOKEN_LENGTH": 20,
    "TOKEN_EXPIRE": 7,
    
    //Common value
    "BACKWARD_SPLASH": "\\",
    "FORDWARD_SPLASH": "/",
    "ACCESS_TOKENIZER": "___", //String to separate between user_id and access_token
    "LIMIT_DEFAULT": 20,
    "OFFSET_DEFAULT": 0,
    "SERVICE_HOST": process.env.SERVER_HOST ? process.env.SERVER_HOST : "http://localhost:8080"
};

module.exports = constant;