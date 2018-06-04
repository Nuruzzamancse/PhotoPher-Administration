let Message = require('../model/message');
let Photographer = require('../model/photographer');

let createMessage = (req, res, next) => {
    let title = req.body.title,
        description = req.body.description,
        userId = req.body.userId,
        senderName = req.body.senderName,
        senderPhoneNumber = req.body.senderPhoneNumber;

    if (!title) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete message title.'});
    } else if (!description) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete message description.'});
    } else if (!userId) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete photo owner id.'});
    } else {
        Photographer.findById(userId, (err, photographer) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
            } else if (photographer) {
                let message = new Message({
                    title: title,
                    description: description,
                    userId: userId,
                    isRead: false,
                    date: Date.now(),
                    senderName: senderName,
                    senderPhoneNumber: senderPhoneNumber
                });

                message.save((err, message) => {
                    if (err) {
                        return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
                    } else {
                        return res.status(201).json({ success: true, message: 'Successfully create the message.', data: message });
                    }
                });
            }
        });
    }
};

let getAllMessage = (req, res, next) => {
    Message.find((err, messages) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
        } else {
            return res.status(201).json({ success: true, message: 'Successfully got all the messages.', data: messages });
        }
    });
};

let getSingleMessage = (req, res, next) => {
    let messageId = req.params.messageId;
    if (!messageId) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete message identity.'});
    } else {
        Message.findById(messageId, (err, message) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
            } else {
                return res.status(201).json({ success: true, message: 'Successfully got the message.', data: message });
            }
        });
    }
};

let updateMessage = (req, res, next) => {
    let messageId = req.params.messageId,
        title = req.body.title,
        description = req.body.description,
        userId = req.body.userId,
        isRead = req.body.isRead,
        senderName = req.body.senderName,
        senderPhoneNumber = req.body.senderPhoneNumber;
    if (!messageId) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete message identity.'});
    } else if (!title) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete message title.'});
    } else if (!description) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete message description.'});
    } else if (!userId) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete message owner.'});
    } else if (typeof isRead == 'undefined') {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete message read status.'});
    } else {
        Message.findById(messageId, (err, message) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
            } else {
                message.title = title || message.title;
                message.description = description || message.description;
                message.userId = userId || message.userId;
                message.isRead = (typeof isRead == 'undefined') ? message.isRead : isRead;
                message.senderName = senderName || message.senderName;
                message.senderPhoneNumber = senderPhoneNumber || message.senderPhoneNumber;
                message.save((err, message) => {
                    if (err) {
                        return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
                    } else {
                        return res.status(201).json({ success: true, message: 'Successfully update the message.', data: message });
                    }
                });
            }
        });
    }
};

let deleteMessage = (req, res, next) => {
    let messageId = req.params.messageId;
    if (!messageId) {
        return res.status(202).json({ success: false, message: 'Invalid or incomplete message identity.'});
    } else {
        Message.findByIdAndRemove(messageId, (err, message) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Fatal Server Error: ' + err});
            } else {
                return res.status(201).json({ success: true, message: 'Successfully delete the message.', data: message });
            }
        });
    }
};

let photographersAllMessage = (req, res, next) => {
    let photographerId = req.params.photographerId;
    if (!photographerId) {
        res.status(202).json({ success: false, message: 'Invalid photographer Id.'});
    } else {
        Message.find({ userId: photographerId }, (err, messages) => {
            if (err) {
                res.status(401).json({ success: false, message: 'Fatal server error: ' + err });
            } else {
                res.status(201).json({ success: true, message: 'Successfully got the photographers message', data: messages });
            }
        });
    }
};

let photographersReadMessage = (req, res, next) => {
    let photographerId = req.params.photographerId;
    if (!photographerId) {
        res.status(202).json({ success: false, message: 'Invalid photographer Id.'});
    } else {
        Message.find({ userId: photographerId, isRead: true }, (err, messages) => {
            if (err) {
                res.status(401).json({ success: false, message: 'Fatal server error: ' + err });
            } else {
                res.status(201).json({ success: true, message: 'Successfully got the photographers message', data: messages });
            }
        });
    }
};

let photographersUnReadMessage = (req, res, next) => {
    let photographerId = req.params.photographerId;
    if (!photographerId) {
        res.status(202).json({ success: false, message: 'Invalid photographer Id.'});
    } else {
        Message.find({ userId: photographerId, isRead: false }, (err, messages) => {
            if (err) {
                res.status(401).json({ success: false, message: 'Fatal server error: ' + err });
            } else {
                res.status(201).json({ success: true, message: 'Successfully got the photographers message', data: messages });
            }
        });
    }
};

module.exports = {
    createMessage,
    getAllMessage,
    getSingleMessage,
    updateMessage,
    deleteMessage,
    photographersAllMessage,
    photographersReadMessage,
    photographersUnReadMessage
};