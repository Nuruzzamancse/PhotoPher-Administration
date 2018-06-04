let Admin = require('../model/admin'),
    User = require('../model/user');

let createAdmin = (req, res, next) => {
    let email = req.body.email,
        password = req.body.password,
        name = req.body.name;
    console.log('This is creating admin.');
    if (!email) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete email.'});
    } else if (!password || password.length < 6) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete password.'});
    } else if (!name) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete name.'});
    } else {
        User.findOne({email: email}, (err, user) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
            } else if (user) {
                return res.status(200).json({ success: false, message: 'User already exists.'});
            } else {
                let admin = new Admin({
                    name: name
                });
                admin.save((err, admin) => {
                    if (err) {
                        return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
                    } else {
                        console.log('Saved admin: ');
                        console.log(admin);
                        let user = new User({
                            email: email,
                            password: password,
                            isAdmin: true,
                            role: 'Admin',
                            adminId: admin._id
                        });
                        user.save((err, user) => {
                            if (err) {
                                return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
                            } else {
                                return res.status(201).json({ success: true, message: 'Successfully created the adminProfile account.', data: user });
                            }
                        });
                    }
                });
            }
        });
    }
};

let getSingleAdmin = (req, res, next) => {
    let id = req.params.id;
    if (!id) {
        return res.status(201).json({ success: false, message: 'Invalid or incomplete user adminProfile id.'});
    }

};

let getAllAdmin = (req, res, next) => {

};

let updateAdmin = (req, res, next) => {
    let id = req.params.id,
        email = req.body.email,
        password = req.body.password,
        name = req.body.admin.name,
        adminId = req.body.admin._id;
    if (!id) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete user adminProfile id.'});
    } else if (!email) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete email.'});
    } else if (!password || password.length < 6) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete password.'});
    } else if (!name) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete name.'});
    } else {
        Admin.findById(adminId, (err, admin) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
            } else {
                admin.name = name || admin.name;
                admin.save((err, admin) =>  {
                    if (err) {
                        return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
                    } else {
                        User.findById(id, (err, user) => {
                            user.email = email || user.email;
                            user.password = password || user.password;
                            user.admin = admin;
                            user.save((err, user) => {
                                if (err) {
                                    return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
                                } else {
                                    console.log('Update user');
                                    return res.status(201).json({ success: true, message: 'Successfully updated the admins account.', data: user });
                                }
                            });
                        });
                    }
                });
            }
        });
    }
};

let deleteAdmin = (req, res, next) => {
    let id = req.params.id;
    if (!id) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete user adminProfile id.'});
    }

};

module.exports = {
    createAdmin,
    getAllAdmin,
    getSingleAdmin,
    updateAdmin,
    deleteAdmin
};
