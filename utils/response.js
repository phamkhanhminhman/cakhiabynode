const messages = require('../config/response_message');
const messages_key = require('../config/response_message_key');

let generateMessage = (key) => {
    if (key) {
        let keys = key.split('.');
        let message = messages;
        try {
            keys.forEach(element => {
                message = message[element];
            });
            return message;
        } catch (error) {
            return null;
        }
    } else {
        return null
    }
}

let generateCode = (key) => {
    if (key) {
        try {
            let keys = key.split('.');
            let httpCode = messages_key;
            keys.forEach(element => {
                httpCode = httpCode[element];
            });
            return httpCode['HTTP_CODE'];
        } catch (error) {
            return null;
        }
    } else {
        return null
    }
}
 
let bodyResponse = (key) => {
    let resBody = {
        'code': generateCode(key),
        'message': generateMessage(key),
        'server_time': new Date().toLocaleString()
    }

    return resBody;
}

function withMessage(key, status, data, res) {
    let resBody = bodyResponse(key);
    let code = generateCode(key);
    resBody.status = status;
    if (data !== null) {
        resBody.data = data;
        if (data.totalItems) {
            resBody.totalItems = data.totalItems
        }
    }
    if (code) {
        res.status(code).json(resBody);
    } else {
        res.json(resBody);
    }
}

let errorServices = (key, res) => {
    let body = {
        'code' : generateCode(key),
        'status': false,
        'message': generateMessage(key),
        'server_time': new Date().toLocaleString()
    }

    res.json(body);
}

module.exports = {
    withMessage, errorServices
};