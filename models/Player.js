const mongoose = require('mongoose');

const positionList = ["GK", "CB", "LB", "RB", "CM", "CAM", "CDM", "LW", "RW", "ST"];

const PlayerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Player's name is required!"],
    },
    displayName: {
        type: String,
        trim: true,
        required: [true, "Display name is required!"],
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address!'],
        unique: [true, "This email has been used!"],
    },
    phone: {
        type: String,
        unique: [true, "This phone number has been used!"],
    },
    place: {
        // District
        type: String,
    },
    isActivated: {
        type: Boolean,
        default: false,
    },
    position: {
        main: {
            type: String,
            enum: positionList,
            required: [true, "Main playing position is required!"],
        },
        secondary: [{
            type: String,
            enum: positionList,
        }]
    },
    dob: {
        type: Date,
        default: Date.now,
    },
    freeTime: {
        when: [{
            type: String,
            enum: ["Morning", "Afternoon", "Evening"],
        }],
    },
    capability: {
        type: String,
        enum: ["Beginner", "Amateur", "Intermediate", "Good", "Semi-professional", "Top"],
    },
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teams"
    }],
    request: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teams'
    }],

});


module.exports = mongoose.model('Players', PlayerSchema);