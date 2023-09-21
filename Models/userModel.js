const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        primaryKey: true,
        required :true,
    },
    name: {
        type: String,
        default: null,
        required :true,
    },
    email: {
        type: String,
        required :true,
    },
    password: {
        type: String,
        validate: {
            validator: function (value) {
                return value.length >= 6;
            },
            message: 'Password must be at least 6 characters long'
        },
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User