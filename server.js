let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    ua = require('universal-analytics');

let config = require('./config');

let visitor = ua(config.analytics, {https: true});
visitor.pageview("/server").send();

let port = process.env.PORT || config.serverPort;

mongoose.Promise = global.Promise;
mongoose.connect(config.database, (err) => {
    if (err) {
        console.log('Error in database connection. ' + err);
    } else {
        console.log('Database connected');
    }
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

let authController = require('./controller/auth');

let photoRoutes = require('./route/photo'),
    photographerRoutes = require('./route/photographer'),
    adminRoutes = require('./route/admin'),
    recruiterRoutes = require('./route/recruiter'),
    superAdminRoutes = require('./route/superAdmin'),
    authRoutes = require('./route/auth'),
    albumRoutes = require('./route/album'),
    messageRoutes = require('./route/message'),
    feedbackRoutes = require('./route/feedback'),
    categoryRoutes = require('./route/category'),
    stripeRoutes = require('./route/stripe'),
    clientRoutes = require('./route/client'),
    cartRoutes = require('./route/cart'),
    buyListRoutes = require('./route/buyList'),
    wishListRoutes = require('./route/wishList'),
    customRoutes = require('./route/custom/custom');

app.use('/api/test', (req, res, next) => {
    return res.status(201).json({ success: true, message: "Well come to photopher api. You are not authenticated. Please contact to the corresponding authrority to receive the client id and client secret." });
});

    app.use('/api/authrorizedTest', authController.developerIdentityCheck, (req, res, next) => {
    return res.status(201).json({ success: true, message: "Well come to photopher api. You are now authenticated developer." });
});

app.use('/api/photo', photoRoutes);
app.use('/api/auth', authController.developerIdentityCheck, authRoutes);
app.use('/api/photographer', authController.developerIdentityCheck, photographerRoutes);
app.use('/api/admin', authController.developerIdentityCheck, adminRoutes);
app.use('/api/recruiter', authController.developerIdentityCheck, recruiterRoutes);
app.use('/api/superAdmin', authController.developerIdentityCheck, superAdminRoutes);
app.use('/api/album', authController.developerIdentityCheck, albumRoutes);
app.use('/api/message', authController.developerIdentityCheck, messageRoutes);
app.use('/api/category', authController.developerIdentityCheck, categoryRoutes);
app.use('/api/feedback', authController.developerIdentityCheck, feedbackRoutes);
app.use('/api/stripe', authController.developerIdentityCheck, stripeRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/cart', authController.developerIdentityCheck, cartRoutes);
app.use('/api/buyList', authController.developerIdentityCheck, buyListRoutes);
app.use('/api/wishList', authController.developerIdentityCheck, wishListRoutes);
app.use('/api/custom', authController.developerIdentityCheck, customRoutes);
app.use('*', (req, res, next) => {
    res.status(200).json({ success: false, message: 'Does not match any resource of the routing.' });
});

app.listen(port, (err) => {
    if (err) {
        console.log('Error in listing port: ' + port);
    } else {
        console.log('App is running in port: ' + port);
    }
});
