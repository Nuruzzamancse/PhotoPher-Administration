let Photo = require('../model/photo'),
    Photographer = require('../model/photographer'),
    Album = require('../model/album'),
    Categories = require('../model/category');

let getLengthOfProperty = (req, res, next) => {
    Photo.find((err, photos) => {
        if (err) {
            res.status(401).json({ success: false, message: 'Fatal server error: ' + err });
        } else {
            Photographer.find((err, photographers) => {
                if (err) {
                    res.status(401).json({ success: false, message: 'Fatal server error: ' + err });
                } else {
                    Album.find((err, albums) => {
                        if (err) {
                            res.status(401).json({ success: false, message: 'Fatal server error: ' + err });
                        } else {
                            Categories.find((err, categories) => {
                                if (err) {
                                    res.status(401).json({ success: false, message: 'Fatal server error: ' + err });
                                } else {
                                    let myObj = {
                                        photosLength: photos.length,
                                        photographersLength: photographers.length,
                                        albumsLength: albums.length,
                                        categoriesLength: categories.length
                                    };
                                    res.status(201).json({ success: true, message: 'Successfully got all the property length.', data: myObj });
                                }
                            });
                        }
                    });
                }
            });
        }
    })
};

let addPhotographerRoyality = (req, res, next) => {
    let photoId = req.params.photoId;
    if (typeof photoId == 'undefined' || !photoId) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete photoId.' });
    } else {
        Photo.findById(photoId, (err, photo) => {
            if (err) {
                return res.status(202).json({ success: false, message: 'Fatal server error: ' + err });
            } else {
                let photographerId = photo.ownerId;
                Photographer.findById(photographerId, (err, photographer) => {
                    if (err) {
                        return res.status(202).json({ success: false, message: 'Fatal server error: ' + err });
                    } else {
                        photographer.netBalance = photographer.netBalance + 1;
                        photographer.save((err, photographer) => {
                            if (err) {
                                return res.status(202).json({ success: false, message: 'Fatal server error: ' + err });
                            } else {
                                return res.status(201).json({ success: true, message: 'successfully add the royality to the photographer.', data: photographer });
                            }
                        });
                    }
                });
            }
        });
    }
};

module.exports = {
    getLengthOfProperty,
    addPhotographerRoyality
};