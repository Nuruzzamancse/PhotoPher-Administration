let Album = require('../model/album');
let Category = require('../model/category');
let Photo = require('../model/photo');
let Photographer = require('../model/photographer');

let createAlbum = (req, res, next) => {
    const name = req.body.name,
        description = req.body.description,
        ownerId = req.body.ownerId,
        category = req.body.category,
        isPrivate = req.body.isPrivate;
    if (!name) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete Album name.'});
    } else if (!description) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete Album description.'});
    } else if (!ownerId) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete Album ownership.'});
    } else if (!category) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete Album category.'});
    } else {
        let album = new Album({
            name: name,
            description: description,
            ownerId: ownerId,
            views: 0,
            upVote: 0,
            uploadDate: Date.now(),
            category: category,
            isPrivate: isPrivate
        });
        album.save((err, album) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
            } else {
                return res.status(201).json({ success: true, message: 'Successfully created the Photo Album.', data: album });
            }
        });
    }
};

let getSingleAlbum = (req, res, next) => {
    const albumId = req.params.albumId;
    if (!albumId) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete Album id.'});
    } else {
        Album.findById(albumId, (err, album) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
            } else if (album.isPrivate == true) {
                return res.status(202).json({ success: false, message: 'Private album, Require photographer authentication.'});
            }  else {
                return res.status(201).json({ success: true, message: 'Successfully get the Photo Album.', data: album });
            }
        });
    }
};

let getSinglePrivateAlbum = (req, res, next) => {
    const albumId = req.params.albumId;
    if (!albumId) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete Album id.'});
    } else {
        Album.findById(albumId, (err, album) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
            } else {
                return res.status(201).json({ success: true, message: 'Successfully get the Photo Album.', data: album });
            }
        });
    }
};

let getAlbums = (req, res, next) => {
    Album.find((err, albums) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
        } else {
            return res.status(201).json({ success: true, message: 'Successfully get all the Photo Albums.', data: albums });
        }
    });
};

let getPublicAlbums = (req, res, next) => {
    Album.find({ isPrivate: false }, (err, albums) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
        } else {
            return res.status(201).json({ success: true, message: 'Successfully get all the Photo Albums.', data: albums });
        }
    });
};

let getCategorizedAlbums = (req, res, next) => {
    let categoryId = req.params.categoryId;
    if (!categoryId) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete album category.'});
    } else {
        Album.find({isPrivate: false, category: categoryId}, (err, albums) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
            } else {
                return res.status(201).json({ success: true, message: 'Successfully get all the Photo Albums.', data: albums });
            }
        });
    }
};

let getPhotographerAlbum = (req, res, next) => {
    console.log('Getting the photographer album.');
    let photographerId = req.params.photographerId;
    if (!photographerId) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete album category.'});
    } else {
        Album.find({ownerId: photographerId}, (err, albums) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
            } else {
                Category.find((err, categories) => {
                    if (err) {
                        return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
                    } else {
                        let albumInfo = [];
                        addPhotosToAlbumInfo(albums, categories, albumInfo, (err, albumInfo) => {
                            if (err) {
                                console.log('error is: ' + err);
                            } else {
                                console.log('Hello ' + albumInfo);
                                return res.status(201).json({ success: true, message: 'Successfully get all the Photo Albums.', data: albumInfo });
                            }
                        });
                    }
                });
            }
        });
    }
};

let updateAlbum = (req, res, next) => {
    const name = req.body.name,
        description = req.body.description,
        views = req.body.views,
        upVote = req.body.upVote,
        tags = req.body.tags,
        isPrivate = req.body.isPrivate,
        albumId = req.params.albumId,
        category = req.body.category,
        ownerId = req.body.ownerId;
    if (!name) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete Album name.'});
    } else if (!description) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete Album description.'});
    } else if (!ownerId) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete Album ownership.'});
    } else if (!albumId) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete Album id.'});
    } else if (!category) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete category id.'});
    } else {
        Album.findById(albumId, (err, album) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
            } else {
                album.name = name || album.name;
                album.description = description || album.description;
                album.views = views || (album.views + 1);
                album.upVote = upVote || album.upVote;
                album.updateDate.push(Date.now());
                album.tags = tags || album.tags;
                album.isPrivate = (isPrivate == true) ? true : false;
                album.category = category || album.category;
                album.save((err, album) => {
                    if (err) {
                        return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
                    } else {
                        return res.status(201).json({ success: true, message: 'Successfully update the Photo Albums.', data: album });
                    }
                });
            }
        });
    }
};

let deleteAlbum = (req, res, next) => {
    let albumId = req.params.albumId;
    Album.findByIdAndRemove(albumId, (err, album) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
        } else {
            return res.status(201).json({ success: true, message: 'Successfully delete the Photo Albums.', data: album });
        }
    });
};

let getPublicAlbumsInfo = (req, res, next) => {

    Album.find({isPrivate: false}, (err, albums) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
        } else {
            Category.find((err, categories) => {
                if (err) {

                } else {
                    let albumInfo = [];
                    let albumInfoObjct = {};
                    addPhotosToAlbumInfo(albums, categories, albumInfo, (err, albumInfo) => {
                        if (err) {
                            console.log('error is: ' + err);
                        } else {
                            return res.status(201).json({ success: true, message: 'Successfully get all the Photo Albums.', data: albumInfo });
                        }
                    });
                }
            });
        }
    });
};

let getPhotographerPublicAlbumsInfo = (req, res, next) => {
    let photographerId = req.params.photographerId;
    if (!photographerId) {
        res.status(202).json({ success: false, message: 'Invalid or incomplete photographerId.' });
    } else {
        Album.find({ isPrivate: false, ownerId: photographerId }, (err, albums) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
            } else {
                Category.find((err, categories) => {
                    if (err) {

                    } else {
                        let albumInfo = [];
                        let albumInfoObjct = {};
                        addPhotosToAlbumInfo(albums, categories, albumInfo, (err, albumInfo) => {
                            if (err) {
                                console.log('error is: ' + err);
                            } else {
                                return res.status(201).json({ success: true, message: 'Successfully get all the Photo Albums.', data: albumInfo });
                            }
                        });
                    }
                });
            }
        });
    }
};

let getPhotographerAllAlbum = (req, res, next) => {
    let photographerId = req.params.photographerId;
    if (!photographerId) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete photographer id.' });
    } else {
        Album.find({ ownerId: photographerId }, (err, albums) => {
            if (err) {
                return res.status(401).json({ success: false, message: err });
            } else {
                return res.status(201).json({ success: true, message: 'successfully got the photographers album.', data: albums });
            }
        });
    }
};

module.exports = {
    createAlbum,
    getSingleAlbum,
    getSinglePrivateAlbum,
    getAlbums,
    updateAlbum,
    deleteAlbum,
    getPublicAlbums,
    getCategorizedAlbums,
    getPhotographerAlbum,
    getPublicAlbumsInfo,
    getPhotographerPublicAlbumsInfo,
    getPhotographerAllAlbum
};

let addPhotosToAlbumInfo = (albums, categories, albumInfo, cb) => {

    for (let index=0; index<albums.length; index++) {
        let myAlbum = albums[index];
        console.log('Got the current album: ');
        console.log(myAlbum._id);
        let myPhotos = [];
        let myCategory;
        let myAlbumOwner;
        getAlbumCategory(categories, myAlbum.category, (err, category) => {
            if (err) {
                cb (err, null);
            } else {
                myCategory = category;
                getAlbumOwner(myAlbum.ownerId, (err, photographer) => {
                    if (err) {
                        return cb (err, null);
                    } else {
                        myAlbumOwner = photographer;
                        getPhotosOfAlbum(myAlbum._id, (err, photos) => {
                            if (err) {
                                cb (err, null);
                            } else {
                                myPhotos = photos;
                                let myObject = {
                                    album: myAlbum,
                                    albumCategory: myCategory,
                                    photos: photos,
                                    owner: myAlbumOwner
                                };
                                albumInfo.push(myObject);
                                if (albumInfo.length == albums.length) {
                                    cb (null, albumInfo);
                                }
                            }
                        });
                    }
                });
            }
        });
    }
};

let getPhotosOfAlbum = (albumId, cb) => {
    console.log('Gettign the albumId ' + albumId + ' photos');
    Photo.find({albumId: albumId}, (err, photos) => {
        if (err) {
            cb(err, null)
        } else {
            cb(null, photos);
        }
    });
};

let getAlbumCategory = (categories, albumId, cb) => {
    for (let index=0; index<categories.length; index++) {
        let category = categories[index];
        if (category._id == albumId) {
            return cb(null, category);
        }
        if (index == categories.length -1) {
            return cb ('Category Not Found for albumId: ' + albumId, null);
        }
    }
};

let getAlbumOwner = (photographerId, cb) => {
    console.log('finding photographer: ' + photographerId);
    Photographer.findById(photographerId, (err, photographer) => {
        if (err) {
            return cb(err, null);
        } else {
            return cb(null, photographer);
        }
    });
};
