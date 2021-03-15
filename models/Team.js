const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Team's name is required!"],
    },
    slogan: {
        type: String,
    },
    place:{
        // District
        type: String,
    },
    logoURL:{
        type: String,
        // URL to folder '/uploads/logos/'
    },
    ageRange:{
        min : Number,
        max: Number,
        avg: Number,
    },
    freeTime: {
        when: [{
            type: String,
            enum: ["Morning", "Afternoon", "Evening"],
        }],
    },
    captain:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Players',
        required: [true, "Team's captain is required!"],
    },
    capability: {
        type: String,
        enum: ["Beginner", "Amateur", "Intermediate", "Good", "Semi-professional", "Top"],
        required: [true, "Team's capability is required!"],
    },
    request:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Players'
    }]
})

module.exports = mongoose.model('Team', TeamSchema);