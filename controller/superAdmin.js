let SuperAdmin = require('../model/superAdmin'),
    User = require('../model/user');

let createSuperAdmin = (req, res, next) => {
    let email = req.body.email,
        password = req.body.password,
        name = req.body.name;

    if (!email) {
        return res.status(301).json({ success: false, message: 'Invalid or incomplete email.'});
    } else if (!password || password.length < 6) {
        return res.status(301).json({ success: false, message: 'Invalid or incomplete password.'});
    } else if (!name) {
        return res.status(301).json({ success: false, message: 'Invalid or incomplete name.'});
    } else {
        User.findOne({email: email}, (err, user) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Fatal Server Error: ' + err});
            } else if (user) {
                return res.status(200).json({ success: false, message: 'User already exists.'});
            } else {
                let superSuperAdmin = new SuperAdmin({
                    name: name
                });
                superSuperAdmin.save((err, superSuperAdmin) => {
                    if (err) {
                        return res.status(500).json({ success: false, message: 'Fatal Server Error: ' + err});
                    } else {
                        let user = new User({
                            email: email,
                            password: password,
                            superSuperAdmin: superSuperAdmin,
                            isSuperAdmin: true,
                            role: 'SuperAdmin'
                        });
                        user.save((err, user) => {
                            if (err) {
                                return res.status(500).json({ success: false, message: 'Fatal Server Error: ' + err});
                            } else {
                                return res.status(201).json({ success: true, message: 'Successfully created the superSuperAdmin account.', data: user });
                            }
                        });
                    }
                });
            }
        });
    }
};

let getSingleSuperAdmin = (req, res, next) => {
    let id = req.params.id;
    if (!id) {
        return res.status(201).json({ success: false, message: 'Invalid or incomplete user superSuperAdmin id.'});
    }

};

let getAllSuperAdmin = (req, res, next) => {

};

let updateSuperAdmin = (req, res, next) => {
    let id = req.params.id,
        email = req.body.email,
        password = req.body.password,
        name = req.body.superSuperAdmin.name,
        superSuperAdminId = req.body.superSuperAdmin._id;
    if (!id) {
        return res.status(301).json({ success: false, message: 'Invalid or incomplete user superSuperAdmin id.'});
    } else if (!email) {
        return res.status(301).json({ success: false, message: 'Invalid or incomplete email.'});
    } else if (!password || password.length < 6) {
        return res.status(301).json({ success: false, message: 'Invalid or incomplete password.'});
    } else if (!name) {
        return res.status(301).json({ success: false, message: 'Invalid or incomplete name.'});
    } else {
        SuperAdmin.findById(superSuperAdminId, (err, superSuperAdmin) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Fatal Server Error: ' + err});
            } else {
                superSuperAdmin.name = name || superSuperAdmin.name;
                superSuperAdmin.save((err, superSuperAdmin) =>  {
                    if (err) {
                        return res.status(500).json({ success: false, message: 'Fatal Server Error: ' + err});
                    } else {
                        User.findById(id, (err, user) => {
                            user.email = email || user.email;
                            user.password = password || user.password;
                            user.superSuperAdmin = superSuperAdmin;
                            user.save((err, user) => {
                                if (err) {
                                    return res.status(500).json({ success: false, message: 'Fatal Server Error: ' + err});
                                } else {
                                    console.log('Update user');
                                    return res.status(201).json({ success: true, message: 'Successfully updated the superSuperAdmins account.', data: user });
                                }
                            });
                        });
                    }
                });
            }
        });
    }
};

let deleteSuperAdmin = (req, res, next) => {
    let id = req.params.id;
    if (!id) {
        return res.status(301).json({ success: false, message: 'Invalid or incomplete user superSuperAdmin id.'});
    }

};

module.exports = {
    createSuperAdmin,
    getAllSuperAdmin,
    getSingleSuperAdmin,
    updateSuperAdmin,
    deleteSuperAdmin
};
