const express = require('express');
const { model, Schema } = require('mongoose');
const router = express.Router();
const Team = require('../../models/Team');
const Player = require('../../models/Player');


// Get all teams
router.get('/', async (req, res) => {
    try {
        let teams = await Team.find().populate('captain', 'name displayName phone email');
        res.json(teams);
    } catch (err) {
        res.json({ message: err });
    }
});

// Post a team
router.post('/', async (req, res) => {
    let captain;
    try {
        captain = await Player.findById(req.body.captain);
    } catch (err) {
        res.json({ message: err });
    }
    const newteam = await new Team({
        name: req.body.name,
        slogan: req.body.slogan,
        place: req.body.place,
        ageRange: req.body.ageRange,
        captain: captain._id,
        capability: req.body.capability,
        freeTime: req.body.freeTime,
        logoURL: req.body.logoURL,
    });
    newteam.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(403).json({ message: err });
        });
});

// Change captian
router.patch('/:TeamId', async (req, res) => {
    let newCap, team;

    try {
        team = await Team.findById(req.params.TeamId);
    } catch (err) {
        res.json({ message: err });
    }
    try {
        newCap = await Player.findById(req.body.captain);
    } catch (err) {
        res.json({ message: err });
    }
    team.captain = newCap._id;
    console.log('captain', newCap);
    try {
        await team.save()
        .populate('captain')
        .then(savedTeam => {
            res.json(savedTeam); 
        })
    } catch (err) {
        res.json({ message: err });
    }

    console.log(team.captain);


})
module.exports = router;