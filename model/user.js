let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs');

let UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    createdDate: { type: String, required: true, default: Date.now() },
    role: { type: String, required: true },
    adminId: { type: String },
    superAdminId: { type: String },
    photographerId: { type: String },
    recruiterId: { type: String },
    isAdmin: { type: Boolean, required: false, default: false },
    isSuperAdmin: { type: Boolean, required: false, default: false },
    isPhotographer: { type: Boolean, required: false, default: false },
    isRecruiter: { type: Boolean, required: false, default: false }
});

// Pre-save of user's hash bloggerPassword to database
UserSchema.pre('save', function (next) {
    const users = this,
        SALT_FACTOR = 5;

    if (!users.isModified('password')) return next();

    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(users.password, salt, null, (err, hash) => {
            if (err) return next(err);
            users.password = hash;
            next();
        });
    });
});

// Method to compare bloggerPassword for login
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        } else {
            cb(null, isMatch);
        }
    });
};

module.exports = mongoose.model('User', UserSchema, 'User');