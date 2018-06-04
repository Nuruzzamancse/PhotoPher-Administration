let Photo = require('../model/photo'),
    multer = require('multer'),
    watermark = require('image-watermark'),
    ua = require('universal-analytics'),
    config = require('../config'),
    Album = require('../model/album');

let visitor = ua(config.analytics, {https: true});
visitor.screenview("/photo").send();

let store = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/uploads/original/');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '.' + file.originalname);
    }
});

let upload = multer({storage:store}).single('file');

const createPhoto = (req, res, next) => {
    const name = req.body.name,
        uploadDate = Date.now(),
        albumId = req.params.id,
        displayName = req.body.displayName,
        ownerId = 'owner id', // will be replaced by the album owner id
        category = req.body.category,
        tags = req.body.tags || [];
    if (!albumId) {
        return res.status(301).json({ success: false, message: 'Invalid or incomplete information.'});
    } else {
        upload(req, res, (err) => {
            if(err){
                return res.status(500).json({ success: false, message: 'Fatal Server Error: ' + err});
            } else {
                visitor.event("Photo CRUD", "Photo " + req.file.filename + " being uploaded.").send();
                let options = {
                    'text' : 'Photo Archive',
                    'dstPath' : './public/uploads/watermarked/' + req.file.filename
                };
                // watermark.embedWatermark('./public/uploads/original/' + req.file.filename, options);
                // visitor.event("Photo CRUD", "Photo " + req.file.filename + " watermarked being creted.").send();
                Album.findById(albumId, (err, album) => {
                    if (err) {
                        return res.status(500).json({ success: false, message: 'Fatal Server Error: ' + err});
                    } else {
                        console.log('Album is:');
                        console.log(album);
                        let modifiedDisplayName;
                        if (req.file.originalname.length >= 20) {
                            modifiedDisplayName = req.file.originalname.substr(req.file.originalname.length - 20);
                        } else {
                            modifiedDisplayName = req.file.originalname;
                        }
                        let photo = new Photo({
                            displayName: modifiedDisplayName,
                            name: req.file.filename,
                            originalPath: '/uploads/original/' + req.file.filename,
                            watermarkedPath: '/uploads/watermarked/' + req.file.filename,
                            views: 0,
                            upVote: 0,
                            upVoterList: [],
                            uploadDate: uploadDate,
                            tags: tags,
                            albumId: albumId,
                            ownerId: album.ownerId,
                            category: album.category
                        });
                        photo.save((err, data) => {
                            if (err) {
                                return res.status(500).json({ success: false, message: 'Fatal Server Error: ' + err});
                            } else {
                                visitor.event("Photo CRUD", "Photo " + req.file.filename + " information saved.").send();
                                return res.status(201).json({ success: true, message: 'Successfully saved the photo.', data: data, originalname:req.file.originalname, uploadname:req.file.filename });
                            }
                        });
                    }
                });
            }
        });

    }
};

let getAllPhoto = (req, res, next) => {
    Photo.find((err, photos) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Fatal server error " + JSON.stringify(err) });
        } else {
            return res.status(201).json({ success: true, message: "Successfully got the photos information.", data: photos });
        }
    });
};

let getSinglePublicPhoto = (req, res, next) => {
    let photoId = req.params.photoId;
    Photo.findById(photoId, (err, photo) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Error in updating existing photo: ' + err });
        } else if (!photo) {
            return res.status(201).json({ success: false, message: 'No photo found.' });
        } else {
            let albumId = photo.albumId;
            Album.findById(albumId, (err, album) => {
                if (err) {

                } else {
                    if (album.isPrivate) {
                        return res.status(202).json({ success: false, message: 'Invalid authority.' });
                    } else {
                        return res.status(201).json({ success: true, message: 'Successfully found the photo.', data: photo });
                    }
                }
            });
        }
    });
};

let getSinglePrivatePhoto = (req, res, next) => {
    let photoId = req.params.photoId;
    Photo.findById(photoId, (err, photo) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Error in updating existing photo: ' + err });
        } else if (!photo) {
            return res.status(201).json({ success: false, message: 'No photo found.' });
        } else {
            return res.status(201).json({ success: true, message: 'Successfully found the photo.', data: photo });
        }
    });
};

let updatePhoto = (req, res, next) => {
    console.log(req.body);
    let photoId = req.params.photoId,
        name = req.body.name,
        // originalPath = req.body.originalPath,
        // watermarkedPath = req.body.watermarkedPath,
        views = req.body.views,
        displayName = req.body.displayName,
        likes = req.body.likes,
        upVote = req.body.upVote,
        upVoterList = req.body.upVoterList,
        uploadDate = req.body.uploadDate,
        tags = req.body.tags,
        albumId = req.body.albumId,
        ownerId = req.body.ownerId,
        category = req.body.category,
        price = req.body.price;
    if (!photoId) {

    } else if (!name) {
        return res.status(201).json({success: false, message: 'Invalid or incomplete name.'});
    } else if (!displayName) {
        return res.status(201).json({success: false, message: 'Invalid or incomplete displayName.'});
    } else if (typeof views == 'undefined') {
        return res.status(201).json({success: false, message: 'Invalid or incomplete views.'});
    } else if (typeof likes == 'undefined') {
        return res.status(201).json({success: false, message: 'Invalid or incomplete likes.'});
    } else if (typeof upVote == 'undefined') {
        return res.status(201).json({success: false, message: 'Invalid or incomplete upVote.'});
    } else if (typeof uploadDate == 'undefined') {
        return res.status(201).json({success: false, message: 'Invalid or incomplete upload date.'});
    } else if (!tags) {
        return res.status(201).json({success: false, message: 'Invalid or incomplete tags.'});
    } else if (!albumId) {
        return res.status(201).json({success: false, message: 'Invalid or incomplete album id.'});
    } else if (!ownerId) {
        return res.status(201).json({success: false, message: 'Invalid or incomplete owner id.'});
    } else if (!category) {
        return res.status(201).json({success: false, message: 'Invalid or incomplete category.'});
    } else if (!price) {
        return res.status(201).json({success: false, message: 'Invalid or incomplete price.'});
    } else {
        Photo.findById(photoId, (err, photo) => {
            if (err) {
                return res.status(201).json({ success: false, message: 'Error in finding relevent photo: ' + err });
            } else {
                photo.name = name || photo.name;
                photo.displayName = displayName || photo.displayName;
                photo.views = views || photo.views;
                photo.likes = likes || photo.likes;
                photo.upVote = upVote || photo.upVote;
                photo.upVoterList = upVoterList || photo.upVoterList;
                photo.uploadDate = uploadDate || photo.uploadDate;
                photo.tags = tags || photo.tags;
                photo.albumId = albumId || photo.albumId;
                photo.ownerId = ownerId || photo.ownerId;
                photo.category = category || photo.category;
                photo.price = price || photo.price;
                photo.save((err, photo) => {
                    if (err) {
                        return res.status(401).json({ success: false, message: 'Error in updating existing photo: ' + err });
                    } else {
                        return res.status(201).json({ success: true, message: 'Successfully updated the photo.', data: photo});
                    }
                });
            }
        });
    }

};

let deletePhoto = (req, res, next) => {
    let photoId = req.params.photoId;
    if (!photoId) {
        res.status(202).json({ success: false, message: 'Invalid or incomplete photo id.' });
    } else {
        Photo.findByIdAndRemove(photoId, (err, photo) => {
            if (err) {
                res.status(401).json({ success: false, message: 'Fatal server error: ' + err });
            } else {
                res.status(201).json({ success: true, message: 'Successfully removed the photo.', data: photo });
            }
        });
    }
};

let getPhotoOfAlbum = (req, res, next) => {
    let albumId = req.params.albumId;
    if (!albumId) {
        return res.status(301).json({ success: false, message: 'Invalid or incomplete album id.'});
    } else {
        Photo.find({albumId: albumId}, (err, photoes) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Fatal Server Error: ' + err});
            } else {
                return res.status(201).json({ success: true, message: 'Successfully get the photo of album.', data: photoes });
            }
        });
    }
};

let getPublicPhoto = (req, res, next) => {
    Photo.find((err, photos) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Fatal server error: ' + err });
        } else {
            Album.find({isPrivate: false}, (err, albums) => {
                if (err) {
                    return res.status(401).json({ success: false, message: 'Fatal server error: ' + err });
                } else {
                    filterPublicPhotos(albums, photos, (err, myPublicPhotos) => {
                        if (err) {
                            return res.status(401).json({ success: false, message: 'Fatal server error: ' + err });
                        } else {
                            return res.status(201).json({ success: true, message: 'Successfully got all the photos', data: myPublicPhotos });
                        }
                    });
                }
            });
        }
    });
};

let searchPhoto = (req, res, next) => {
    let searchKeyword = req.params.searchKeyword;
    if (!searchKeyword) {
        return res.status(202).json({ success: false, message: 'Invalid or incompleet search keyowrd' });
    } else {
        Photo.find((err, photos) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Fatal server error: ' + err });
            } else {
                Album.find({isPrivate: false}, (err, albums) => {
                    if (err) {
                        return res.status(401).json({ success: false, message: 'Fatal server error: ' + err });
                    } else {
                        filterSearchKeywordPhotos(albums, photos, searchKeyword, (err, myPublicPhotos) => {
                            if (err) {
                                return res.status(401).json({ success: false, message: 'Fatal server error: ' + err });
                            } else {
                                return res.status(201).json({ success: true, message: 'Successfully got all the photos', data: myPublicPhotos });
                            }
                        });
                    }
                });
            }
        });
    }
};

let getAllPhotosOfPhotographer = (req, res, next) => {
    let photographerId = req.params.photographerId;
    if (!photographerId) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete photographerId.' });
    } else {
        Photo.find({ownerId: photographerId}, (err, photos) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Error in fetching photos: ' + err });
            } else {
                return res.status(201).json({ success: true, message: 'Successfully retrieved all the photos.', data: photos });
            }
        });
    }
};

module.exports = {
    createPhoto,
    getSinglePrivatePhoto,
    getSinglePublicPhoto,
    getAllPhoto,
    updatePhoto,
    deletePhoto,
    getPhotoOfAlbum,
    getPublicPhoto,
    searchPhoto,
    getAllPhotosOfPhotographer
};

let filterPublicPhotos = (albums, photos, cb) => {
    let myPhotos=  [];
    getAlbumsId(albums, (err, albumsId) => {
        if (err) {
            cb (err, null);
        } else {
            for (let index=0; index<photos.length; index++) {
                checkPhotoAlbumAvailability(albumsId, photos[index], (err, flag) => {
                    if (flag) {
                        myPhotos.push(photos[index]);
                    }
                });
                if (index == photos.length - 1) {
                    cb (null, myPhotos);
                }
            }
        }
    });
};

let getAlbumsId = (albums, cb) => {
    let albumsId = [];
    for (let index=0; index<albums.length; index++) {
        albumsId.push(albums[index]._id);
    }
    cb (null, albumsId);
};

let checkPhotoAlbumAvailability = (albumsId, photo, cb) => {
    for (let index=0; index<albumsId.length; index++) {
        if (photo.albumId == albumsId[index]) {
            return cb (null, true);
        }
    }
    return cb (null, false);
};

let filterSearchKeywordPhotos = (albums, photos, searchKeyword, cb) => {
    let myPhotos=  [];
    searchKeyword = searchKeyword.toLowerCase();
    getAlbumsId(albums, (err, albumsId) => {
        if (err) {
            cb (err, null);
        } else {
            for (let index=0; index<photos.length; index++) {
                photos[index].name = photos[index].name.toLowerCase();
                photos[index].displayName = photos[index].displayName.toLowerCase();
                if (photos[index].name.includes(searchKeyword) || photos[index].displayName.includes(searchKeyword)) {
                    checkPhotoAlbumAvailability(albumsId, photos[index], (err, flag) => {
                        if (err) {
                            cb(err, null);
                        } else {
                            if (flag) {
                                myPhotos.push(photos[index]);
                            }
                        }
                    });
                }
            }
            cb (null, myPhotos);
        }
    });
};