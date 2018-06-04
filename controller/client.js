let Client = require('../model/client');

let createClient = (req, res, next) => {
    let client = new Client({
        clientId: keyGen(20),
        clientSecret: keyGen(70),
        credentials: 'password'
    });

    client.save((err, client) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Fatal Server Error: ' + err});
        } else {
            return res.status(201).json({ success: true, message: 'Successfully created the client id and password', data: client });
        }
    });
};

let keyGen = (keyLength) => {
    let i,
        key = "",
        characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        charactersLength = characters.length;

    for (i = 0; i < keyLength; i++) {
        key += characters.substr(Math.floor((Math.random() * charactersLength) + 1), 1);
    }

    return key;
};

module.exports = {
    createClient
};