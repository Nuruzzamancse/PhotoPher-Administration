let Category = require('../model/category');

let createCategory = (req, res, next) => {
    let title = req.body.title,
        description = req.body.description;
    if (!title) {
        return res.status(301).json({ success: false, message: 'Invalid or incomplete category title.'});
    } else if (!description) {
        return res.status(301).json({ success: false, message: 'Invalid or incomplete feedback description.'});
    } else {
        let category = new Category({
            title: title,
            description: description
        });
        category.save((err, category) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Fatal Server Error: ' + err});
            } else {
                return res.status(201).json({ success: true, message: 'Successfully create the category.', data: category });
            }
        });
    }
};

let getAllCategory = (req, res, next) => {
    Category.find((err, categories) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Fatal Server Error: ' + err});
        } else {
            return res.status(201).json({ success: true, message: 'Successfully get the categories.', data: categories });
        }
    });
};

let getSingleCategory = (req, res, next) => {
    let categoryId = req.params.categoryId;
    if (!categoryId) {
        return res.status(301).json({ success: false, message: 'Invalid or incomplete category entity.'});
    } else {
        Category.findById(categoryId, (err, category) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Fatal Server Error: ' + err});
            } else {
                return res.status(201).json({ success: true, message: 'Successfully get the category.', data: category });
            }
        });
    }
};

let updateCategory = (req, res, next) => {
    let categoryId = req.params.categoryId,
        title = req.body.title,
        description = req.body.description;
    if (!categoryId) {
        return res.status(301).json({ success: false, message: 'Invalid or incomplete category entity.'});
    } else if (!title) {
        return res.status(301).json({ success: false, message: 'Invalid or incomplete category title.'});
    } else if (!description) {
        return res.status(301).json({ success: false, message: 'Invalid or incomplete category description.'});
    } else {
        Category.findById(categoryId, (err, category) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Fatal Server Error: ' + err});
            } else {
                category.title = title || category.title;
                category.description = description || category.description;
                category.save((err, category) => {
                    if (err) {
                        return res.status(500).json({ success: false, message: 'Fatal Server Error: ' + err});
                    } else {
                        return res.status(201).json({ success: true, message: 'Successfully update the category.', data: category });
                    }
                });
            }
        });
    }
};

let deleteCategory = (req, res, next) => {
    let categoryId = req.params.categoryId;
    if (!categoryId) {
        return res.status(301).json({ success: false, message: 'Invalid or incomplete category entity.'});
    } else {
        Category.findByIdAndRemove(categoryId, (err, category) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Fatal Server Error: ' + err});
            } else {
                return res.status(201).json({ success: true, message: 'Successfully delete the category.', data: category });
            }
        });
    }
};

module.exports = {
    createCategory,
    getAllCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory
};