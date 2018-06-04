let Photographer = require('../model/photographer'),
    User = require('../model/user'),
    Album = require('../model/album'),
    Photo = require('../model/photo');

let createPhotographer = (req, res, next) => {
    let email = req.body.email,
        password = req.body.password,
        name = req.body.name,
        isPremium = req.body.isPremium,
        netBalance = req.body.netBalance;
    console.log('.................................................................................................');
    if (!email) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete email.'});
    } else if (!password || password.length < 6) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete password.'});
    } else if (!name) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete name.'});
    } else if (typeof isPremium == 'undefined') {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete premium status.'});
    } else if (typeof netBalance == 'undefined') {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete net balance.' });
    } else {
        let photographer = new Photographer({
            name: name,
            description: 'Basic info of ' + name,
            upVotes: [],
            wishlists: [],
            isPremium: isPremium,
            netBalance: netBalance
        });

        photographer.save((err, photographer) => {
            if (err) {
                return res.status(201).json({ success: false, message: 'Fatal server error: ' + err});
            } else {
                User.findOne({email: email}, (err, user) => {
                   if (err) {
                       return res.status(202).json({ success: false, message: 'Fatal server error: ' + err});
                   } else if (user != null) {
                       console.log(user);
                       return res.status(202).json({ success: false, message: 'User already exists.'});
                   } else {
                       let user = new User({
                           email: email,
                           password: password,
                           photographerId: photographer._id,
                           isPhotographer: true,
                           role: 'Photographer'
                       });
                       user.save((err, user) => {
                            if (err) {
                                return res.status(202).json({ success: false, message: 'Fatal server error: ' + err});
                            } else {
                                return res.status(201).json({success: true, message: 'Successfully created the user', data: user});
                            }
                       });
                   }
                });
            }
        });
    }
};

let getSinglePhotographer = (req, res, next) => {
    let photographerId = req.params.photographerId;
    console.log('getSinglePhotographer Photographer Id : ' + photographerId);
    if (!photographerId) {
        return res.status(201).json({ success: false, message: 'Invalid or incomplete user photographerProfile id.'});
    }
    Photographer.findById(photographerId, (err, photographer) => {
        if (err) {
            return res.status(400).json({ success: false, message: 'Fatal Server Error: ' + err});
        } else if (!photographer) {
            return res.status(201).json({ success: false, message: 'No photographer exists.'});
        } else {
            return res.status(201).json({ success: true, message: 'Successfully get the photographerProfile account.', data: photographer });
        }
    });
};

let getAllPhotographer = (req, res, next) => {
    Photographer.find((err, photographers) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Fatal Server Error: ' + err});
        } else {
            return res.status(201).json({ success: true, message: 'Successfully get the photographerProfiles .', data: photographers  });
        }
    });
};

let updatePhotographer = (req, res, next) => {
    let photographerId = req.params.photographerId,
        name = req.body.name,
        country = req.body.country,
        city = req.body.city,
        contactNumber = req.body.contactNumber,
        upVotes = req.body.upVotes,
        wishlists = req.body.wishlists,
        isPremium = req.body.isPremium,
        description = req.body.description,
        netBalance = req.body.netBalance;

    console.log('.................................................................................................');

    console.log(req.body);

    if (!photographerId) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete user photographerProfile id.'});
    } else if (!name) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete name.'});
    } else if(typeof isPremium == 'undefined') {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete premium status.'});
    } else if (typeof netBalance == 'undefined') {
        return res.status(202).json('Invalid or incomplete net balance.');
    }  else {
        Photographer.findById(photographerId, (err, photographer) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
            } else if (photographer) {
                photographer.name = name || photographer.name;
                photographer.country = country || photographer.country;
                photographer.description = description || photographer.description;
                photographer.city = city || photographer.city;
                photographer.contactNumber = contactNumber || photographer.contactNumber;
                photographer.upVotes = upVotes || photographer.upVotes;
                photographer.wishlists = wishlists || photographer.wishlists;
                photographer.isPremium = isPremium || photographer.isPremium;
                photographer.netBalance = netBalance || photographer.netBalance;
                photographer.save((err, photographer) =>  {
                    if (err) {
                        return res.status(404).json({ success: false, message: 'Fatal Server Error: ' + err});
                    } else {
                        return res.status(201).json({ success: true, message: 'Successfully updated the photographers account.', data: photographer });
                    }
                });
            } else {
                return res.status(202).json({ success: false, message: 'No photographer exists with passed id.' });
            }
        });
    }
};

let deletePhotographer = (req, res, next) => {
    let photographerId = req.params.photographerId;
    if (!photographerId) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete user photographerProfile id.'});
    } else {
        Photographer.findByIdAndRemove(photographerId, (err, data) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
            } else {
                return res.status(201).json({ success: true, message: 'Successfully delete the photographers account.', data: data});
            }
        });
    }
};


let photographerPrivateInformation = (req, res, next) => {
    let photographerId = req.params.photographerId;
    if (!photographerId) {
        return res.status(202).json({success: false, message: 'Invalid or incomplete photographer id'});
    } else {
        Photographer.findById(photographerId, (err, photographer) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Error: ' + err});
            } else if (!photographer) {
                return res.status(202).json({ success: false, message: 'No photographer found.'});
            } else {
                Album.find({ ownerId: photographerId }, (err, albums) => {
                    if (err) {
                        return res.status(401).json({ success: false, message: 'Error: ' + err});
                    } else {
                        Photo.find({ ownerId: photographerId }, (err, photos) => {
                            if (err) {
                                return res.status(401).json({ success: false, message: 'Error: ' + err});
                            } else {
                                var myObject = {
                                  photographer: photographer,
                                  albums: albums,
                                  photos: photos
                                };
                                return res.status(201).json({ success: true, message: 'Successfully got the photographer information.', data: myObject });
                            }
                        });
                    }
                });
            }
        });
    }
};

module.exports = {
    createPhotographer,
    getAllPhotographer,
    getSinglePhotographer,
    updatePhotographer,
    deletePhotographer,
    photographerPrivateInformation
};


