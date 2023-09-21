const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const CommunitySchema = new mongoose.Schema({
    id: {
        type: String, // Use the appropriate data type for IDs
        primaryKey : true
    },
    name: {
        type: String, 
    },
    slug: {
        type: String, 
        unique : true
    },
    owner: {
        type: String, // Use the appropriate data type for IDs
        ref: 'User',
    },
    created_at : {
        type : Date,
        default : Date.now
    },
    updated_at : {
        type : Date,
        default : Date.now
    }
});

const Community = mongoose.model('Community', CommunitySchema); // Use "mongoose.model" instead of "mongoose.Model"

module.exports = Community;
