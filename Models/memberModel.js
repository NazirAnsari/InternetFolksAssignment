const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const MemberSchema = new mongoose.Schema({
    id:{
        type: String,
        primaryKey : true
    },
    community:{
        type: String,
        ref : 'Community'
    },
    user:{
        type: String,
        ref : 'User'
    },
    role:{
        type: String,
        ref : 'Role'
    },
    created_at : {
        type : Date,
        default : Date.now
    }
})

const Member = mongoose.model('Member', MemberSchema)

module.exports = Member