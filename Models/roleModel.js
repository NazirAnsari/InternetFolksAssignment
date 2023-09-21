const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const roleSchema = new mongoose.Schema({
    id : {
        type : String,
        primaryKey : true
    },
    name : {
        type : String,
        unique : true,
        required :true,
        validate: {
            validator: function (value) {
                // Split the name into words and check if there are at least two words
                const words = value.split(' ');
                return words.length >= 2;
            },
            message: 'Name must contain at least two words',
        },
    },
    scopes : {
        type : Array
    },
    created_at : {
        type : Date,
        default : Date.now
    },
    updated_at : {
        type : Date,
        default : Date.now
    }
})

const Role = mongoose.model('Role',roleSchema)

module.exports  = Role