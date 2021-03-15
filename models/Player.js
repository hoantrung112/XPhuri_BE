const mongoose = require('mongoose');
const crypto = require("crypto");

const positionList = ["GK", "CB", "LB", "RB", "CM", "CAM", "CDM", "LW", "RW", "ST"];

const PlayerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Player's first name is required!"],
    },
    lastName: {
        type: String,
        required: [true, "Player's last name is required!"],
    },
    username: {
        type: String,
        trim: true,
        unique: [true, "This username has been used!"],
        required: [true, "Username is required!"],
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address!'],
        unique: [true, "This email has been used!"],
    },
    phone: {
        type: String,
        sparse: true,
    },
    hash: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    place: {
        // District
        type: String,
        sparse: true,
    },
    isActivated: {
        type: Boolean,
        default: false,
    },
    position: {
        main: {
            type: String,
            enum: positionList,
        },
        secondary: [{
            type: String,
            enum: positionList,
        }],
    },
    dob: {
        type: Date,
        sparse: true,
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
        sparse: true,
    },
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teams",
        sparse: true,
    }],
    request: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teams',
        sparse: true,
    }],

});

PlayerSchema.methods.generatePassword = function (password) {
    this.salt = crypto.randomBytes(128).toString("base64");
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
        .toString("hex");
    console.log("salt: ", this.salt, "hash: ", this.hash);
};

PlayerSchema.methods.isPasswordMatched = function (password) {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
        .toString("hex");
    return hash === this.hash;
};

module.exports = mongoose.model('Player', PlayerSchema);