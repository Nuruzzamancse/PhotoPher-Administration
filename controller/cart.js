let Photographer = require('../model/photographer'),
    Photo = require('../model/photo');

let createCart = (req, res, next) => {};

let getCart = (req, res, next) => {
    let photos = [];
    let photographerId = req.params.photographerId;
    if (!photographerId) {
        return res.status(202).json({success: false, message: 'Invalid or incomplete photographerId'});
    } else {
        Photographer.findById(photographerId, (err, photographer) => {
            if (err) {
                return res.status(401).json({success: false, message: 'Error in finding the photographer: ' + err});
            } else if (!photographer) {
                return res.status(202).json({success: false, message: 'No photographer found.'});
            } else {
                let wishLists = photographer.wishlists;
                getPhotosOfWishLists(photos, wishLists, (err, photos) => {
                    if (err) {
                        return res.status(401).json({success: false, message: 'Error in finding the photographer: ' + err});
                    } else {
                        return res.status(201).json({success: true, message: 'Successfully got the cart list', data: photos});
                    }
                })
            }
        });
    }
};

let getBuyList = (req, res, next) => {
    let photos = [];
    let photographerId = req.params.photographerId;
    if (!photographerId) {
        return res.status(202).json({success: false, message: 'Invalid or incomplete photographerId'});
    } else {
        Photographer.findById(photographerId, (err, photographer) => {
            if (err) {
                return res.status(401).json({success: false, message: 'Error in finding the photographer: ' + err});
            } else if (!photographer) {
                return res.status(202).json({success: false, message: 'No photographer found.'});
            } else {
                let buyLists = photographer.buyLists;
                getPhotosOfBuyLists(photos, buyLists, (err, photos) => {
                    if (err) {
                        return res.status(401).json({success: false, message: 'Error in finding the photographer: ' + err});
                    } else {
                        return res.status(201).json({success: true, message: 'Successfully got the cart list', data: photos});
                    }
                })
            }
        });
    }
};

let updateCart = (req, res, next) => {};

let deleteCart = (req, res, next) => {};

let removePhoto = (req, res, next) => {
    let photographerId = req.params.photographerId,
        photoId = req.params.photoId;
    if (!photographerId) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete photographer id.'});
    } else if (!photoId) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete photo id.'});
    } else {
        Photographer.findById(photographerId, (err, photographer) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Fatal server error: ' + err });
            } else {
                console.log('PhotoID: ' + photoId);
                console.log('PhotographerId: ' + photographerId);
                console.log(photographer.wishlists);

                photographer.wishlists = photographer.wishlists.filter(myPhotoId => myPhotoId != photoId);

                photographer.save((err, photographer) => {
                    if (err) {
                        return res.status(400).json({ success: false, message: 'Fatal server error: ' + err });
                    } else {
                        return res.status(201).json({ success: true, message: 'Succcessfully updated the photographer wishlists.', data: photographer });
                    }
                });
            }
        });
    }
};

let passToBuyList = (req, res, next) => {
    let photographerId = req.params.photographerId,
        photoId = req.params.photoId;
    if (!photographerId) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete photographer id.'});
    } else if (!photoId) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete photo id.'});
    } else {
        Photographer.findById(photographerId, (err, photographer) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Fatal server error: ' + err });
            } else {
                console.log('PhotoID: ' + photoId);
                console.log('PhotographerId: ' + photographerId);
                console.log(photographer.wishlists);

                if (typeof photographer.buyLists == 'undefined') {
                    photographer.passToBuyList = [];
                }

                photographer.wishlists = photographer.wishlists.filter(myPhotoId => myPhotoId != photoId);

                if (photographer.buyLists.indexOf(photoId) < 0) {
                    photographer.buyLists.push(photoId);
                }


                photographer.save((err, photographer) => {
                    if (err) {
                        return res.status(400).json({ success: false, message: 'Fatal server error: ' + err });
                    } else {
                        return res.status(201).json({ success: true, message: 'Succcessfully updated the photographer buyList.', data: photographer });
                    }
                });
            }
        });
    }
};

module.exports = {
    createCart,
    getCart,
    updateCart,
    deleteCart,
    removePhoto,
    passToBuyList,
    getBuyList
};

let getPhotosOfWishLists = (photos, wishLists, cb) => {
    console.log('Photo lists');

    photos = [];

    console.log(wishLists);
    for (let index=0; index<wishLists.length; index++) {
        let photoId = wishLists[index];

        getPhoto(photoId, (err, photo) => {
            if (err) {
                return cb(err, null);
            } else {
                photos.push(photo);
                if (wishLists.length == photos.length) {
                    cb(null, photos);
                }
            }
        });
    }
};

let getPhotosOfBuyLists = (photos, buyLists, cb) => {
    console.log('Photo lists');

    photos = [];

    console.log(buyLists);
    for (let index=0; index<buyLists.length; index++) {
        let photoId = buyLists[index];

        getPhoto(photoId, (err, photo) => {
            if (err) {
                return cb(err, null);
            } else {
                photos.push(photo);
                if (buyLists.length == photos.length) {
                    cb(null, photos);
                }
            }
        });
    }
};

let getPhoto = (photoId, cb) => {
    Photo.findById(photoId, (err, photo) => {
        if (err) {
            cb (err, null);
        } else {
            console.log('Return');
            console.log(photo);
            cb (null, photo);
        }
    });
};