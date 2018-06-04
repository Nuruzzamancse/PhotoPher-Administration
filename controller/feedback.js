let Feedback = require('../model/feedback');

let createFeedback = (req, res, next) => {
    let title = req.body.title,
        description = req.body.description;
    if (!title) {
        return res.status(301).json({ success: false, message: 'Invalid or incomplete feedback title.'});
    } else if (!description) {
        return res.status(301).json({ success: false, message: 'Invalid or incomplete feedback description.'});
    } else {
        let feedback = new Feedback({
            title: title,
            description: description
        });
        feedback.save((err, feedback) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Fatal Server Error: ' + err});
            } else {
                return res.status(201).json({ success: true, message: 'Successfully send the feedback.', data: feedback });
            }
        });
    }
};

let getAllFeedback = (req, res, next) => {
    Feedback.find((err, feedbacks) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Fatal Server Error: ' + err});
        } else {
            return res.status(201).json({ success: true, message: 'Successfully got the feedbacks.', data: feedbacks });
        }
    });
};

let getSingleFeedback = (req, res, next) => {
    let feedbackId = req.params.feedbackId;
    if (!feedbackId) {
        return res.status(301).json({ success: false, message: 'Invalid or incomplete feedback entity.'});
    } else {
        Feedback.findById(feedbackId, (err, feedback) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Fatal Server Error: ' + err});
            } else {
                return res.status(201).json({ success: true, message: 'Successfully got the feedback.', data: feedback });
            }
        });
    }
};

let updateFeedback = (req, res, next) => {
    let feedbackId = req.params.feedbackId,
        title = req.body.title,
        description = req.body.description;
    if (!feedbackId) {
        return res.status(301).json({ success: false, message: 'Invalid or incomplete feedback entity.'});
    } else if (!title) {
        return res.status(301).json({ success: false, message: 'Invalid or incomplete feedback title.'});
    } else if (!description) {
        return res.status(301).json({ success: false, message: 'Invalid or incomplete feedback description.'});
    } else {
        Feedback.findById(feedbackId, (err, feedback) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Fatal Server Error: ' + err});
            } else {
                feedback.title = title || feedback.title;
                feedback.description = description || feedback.description;
                feedback.save((err, feedback) => {
                    if (err) {
                        return res.status(500).json({ success: false, message: 'Fatal Server Error: ' + err});
                    } else {
                        return res.status(201).json({ success: true, message: 'Successfully updated the feedback.', data: feedback });
                    }
                });
            }
        });
    }
};

let deleteFeedback = (req, res, next) => {
    let feedbackId = req.params.feedbackId;
    if (!feedbackId) {
        return res.status(301).json({ success: false, message: 'Invalid or incomplete feedback entity.'});
    } else {
        Feedback.findByIdAndRemove(feedbackId, (err, feedback) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Fatal Server Error: ' + err});
            } else {
                return res.status(201).json({ success: true, message: 'Successfully removed the feedback.', data: feedback });
            }
        });
    }
};

module.exports = {
    createFeedback,
    getAllFeedback,
    getSingleFeedback,
    updateFeedback,
    deleteFeedback
};