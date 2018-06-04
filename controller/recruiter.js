let Recruiter = require('../model/recruiter'),
    User = require('../model/user');

let createRecruiter = (req, res, next) => {
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
                let recruiter = new Recruiter({
                    name: name
                });
                recruiter.save((err, recruiter) => {
                    if (err) {
                        return res.status(500).json({ success: false, message: 'Fatal Server Error: ' + err});
                    } else {
                        let user = new User({
                            email: email,
                            password: password,
                            recruiter: recruiter,
                            isRecruiter: true,
                            role: 'Recruiter'
                        });
                        user.save((err, user) => {
                            if (err) {
                                return res.status(500).json({ success: false, message: 'Fatal Server Error: ' + err});
                            } else {
                                return res.status(201).json({ success: true, message: 'Successfully created the recruiterProfile account.', data: user });
                            }
                        });
                    }
                });
            }
        });
    }
};

let getSingleRecruiter = (req, res, next) => {
    let id = req.params.id;
    if (!id) {
        return res.status(201).json({ success: false, message: 'Invalid or incomplete user recruiterProfile id.'});
    }

};

let getAllRecruiter = (req, res, next) => {

};

let updateRecruiter = (req, res, next) => {
    let id = req.params.id,
        email = req.body.email,
        password = req.body.password,
        name = req.body.recruiter.name,
        recruiterId = req.body.recruiter._id;
    if (!id) {
        return res.status(301).json({ success: false, message: 'Invalid or incomplete user recruiterProfile id.'});
    } else if (!email) {
        return res.status(301).json({ success: false, message: 'Invalid or incomplete email.'});
    } else if (!password || password.length < 6) {
        return res.status(301).json({ success: false, message: 'Invalid or incomplete password.'});
    } else if (!name) {
        return res.status(301).json({ success: false, message: 'Invalid or incomplete name.'});
    } else {
        Recruiter.findById(recruiterId, (err, recruiter) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Fatal Server Error: ' + err});
            } else {
                recruiter.name = name || recruiter.name;
                recruiter.save((err, recruiter) =>  {
                    if (err) {
                        return res.status(500).json({ success: false, message: 'Fatal Server Error: ' + err});
                    } else {
                        User.findById(id, (err, user) => {
                            user.email = email || user.email;
                            user.password = password || user.password;
                            user.recruiter = recruiter;
                            user.save((err, user) => {
                                if (err) {
                                    return res.status(500).json({ success: false, message: 'Fatal Server Error: ' + err});
                                } else {
                                    console.log('Update user');
                                    return res.status(201).json({ success: true, message: 'Successfully updated the recruiters account.', data: user });
                                }
                            });
                        });
                    }
                });
            }
        });
    }
};

let deleteRecruiter = (req, res, next) => {
    let id = req.params.id;
    if (!id) {
        return res.status(301).json({ success: false, message: 'Invalid or incomplete user recruiterProfile id.'});
    }

};

module.exports = {
    createRecruiter,
    getAllRecruiter,
    getSingleRecruiter,
    updateRecruiter,
    deleteRecruiter
};
