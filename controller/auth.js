let jwt = require('jsonwebtoken'),
    config = require('../config'),
    User = require('../model/user'),
    Client = require('../model/client');

let userLogin = (req, res, next) => {
    let email = req.body.email,
        password = req.body.password,
        clientId = req.body.clientId || req.query.clientId || req.headers['clientid'],
        clientSecret = req.body.clientSecret || req.query.clientSecret || req.headers['clientsecret'];

    if (!email) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete email.'});
    } else if (!password) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete password.'});
    } else if (!clientId) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete client id.'});
    } else if (!clientSecret) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete client secret.'});
    } else {
        clientCheck(clientId, clientSecret, res, () => {
            User.findOne({email: email}, (err, user) => {
                if (err) {
                    return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
                } else if (!user) {
                    return res.status(401).json({ success: false, message: 'No users found.'});
                } else {
                    user.comparePassword(password, (err, match) => {
                        if (err) {
                            return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
                        } else if (!match) {
                            return res.status(401).json({ success: false, message: 'Invalid user credentials.'});
                        } else {
                            var token = jwt.sign(user, config.secret, { expiresIn: config.tokenexp });
                            return res.status(201).json({ success: true, data: user, token: token });
                        }
                    });
                }
            });
        });
    }
};

let photographerAuthenticate = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['authorization'];

    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
            } else {
                let user = decoded._doc;
                console.log(decoded);

                if ((user.role == 'Photographer' && user.isPhotographer == true) ||(user.role == 'Admin' && user.isAdmin == true)) {
                    req.decoded = decoded;
                    next();
                } else {
                    return res.status(202).json({ success: false, message: 'Invalid credentials 76' });
                }
            }
        });
    } else {
        return res.status(202).json({
            success: false,
            message: 'Invalid or incomplete authorization token'
        });
    }
};

let adminAuthenticate = (req, res, next) => {
    console.log('Administrator authentication.');
    let token = req.body.token || req.query.token || req.headers['authorization'];
    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
            } else {
                let user = decoded._doc;
                console.log(decoded);
                if (user.role == 'Admin' && user.isAdmin == true) {
                    req.decoded = decoded;
                    next();
                } else {
                    return res.status(202).json({ success: false, message: 'Invalid credentials' });
                }
            }
        });
    } else {
        return res.status(202).json({
            success: false,
            message: 'Invalid or incomplete token'
        });
    }
};

let superAdminAuthenticate = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['authorization'];
    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
            } else {
                let user = decoded._doc;
                if (user.role == 'SuperAdmin' && user.isSuperAdmin == true) {
                    req.decoded = decoded;
                    next();
                } else {
                    return res.status(202).json({ success: false, message: 'Invalid credentials' });
                }
            }
        });
    } else {
        return res.status(202).json({
            success: false,
            message: 'Invalid or incomplete token'
        });
    }
};

let recruiterAuthenticate = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['authorization'];
    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
            } else {
                let user = decoded._doc;
                if (user.role == 'Recruiter' && user.isRecruiter == true) {
                    req.decoded = decoded;
                    next();
                } else {
                    return res.status(202).json({ success: false, message: 'Invalid credentials' });
                }
            }
        });
    } else {
        return res.status(202).json({
            success: false,
            message: 'Invalid or incomplete token'
        });
    }
};

let developerIdentityCheck = (req, res, next) => {
    
    let clientId = req.body.clientId || req.query.clientId || req.headers['clientid'],
        clientSecret = req.body.clientSecret || req.query.clientSecret || req.headers['clientsecret'];

    console.log('Id: ' + clientId);
    console.log('Secret: ' + clientSecret);
    if (!clientId) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete client id.'});
    } else if (!clientSecret) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete client secret.'});
    } else {
        clientCheck(clientId, clientSecret, res, () => {
            next();
        });
    }
};

let clientCheck = (clientId, clientSecret, res, cb) => {
    console.log('ClientId: ' + clientId);
    console.log('ClientSecret: ' + clientSecret);
    Client.findOne({clientId: clientId, clientSecret: clientSecret}, (err, client) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
        } else if (!client) {
            return res.status(401).json({ success: false, message: 'Invalid client credentials' });
        } else {
            return cb();
        }
    });
};

module.exports = {
    userLogin,
    photographerAuthenticate,
    adminAuthenticate,
    superAdminAuthenticate,
    recruiterAuthenticate,
    developerIdentityCheck
};
