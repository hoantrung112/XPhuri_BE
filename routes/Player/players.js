const express = require('express');
const { Mongoose } = require('mongoose');
const router = express.Router();
const Player = require('../../models/Player');

// Get all players
router.get('/', async (req, res) => {
    try {
        const players = await Player.find().limit(20);
        res.json(players);
    } catch (err) {
        res.json({ message: err });
    }
})

//Get one by Id
router.get('/:PlayerId', async (req, res) => {
    try {
        const player = await Player.findById(req.params.PlayerId);
        res.json(player);
    } catch (err) {
        res.json({ errorMessage: err });
    }
})

// Post one new
router.post('/', (req, res) => {

    const newPlayer = new Player({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        place: req.body.place,
        position: req.body.position,
        dob: req.body.dob,
        freeTime: req.body.freeTime,
        capability: req.body.capability,
    });
    newPlayer.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ errorMessage: err });
        });
})

// Delete one by Id
router.delete('/:PlayerId', async (req, res) => {
    try {
        const removedPlayer = await Player.remove({ _id: req.params.PlayerId })
        res.json(removedPlayer);
    }
    catch (err) {
        res.json({ errorMessage: err });
    }
})

// Update one by Id
router.patch('/:PlayerId', async (req, res) => {
    try {
        const update = {};
        if (req.body.firstName != null) update.firstName = (req.body.firstName);
        if (req.body.lastName != null) update.lastName = (req.body.lastName);
        if (req.body.username != null) update.username = (req.body.username);
        if (req.body.email != null) update.email = (req.body.email);
        if (req.body.phone != null) update.phone = (req.body.phone);
        if (req.body.place != null) update.place = (req.body.place);
        if (req.body.position != null) update.position = (req.body.position);
        if (req.body.freeTime != null) update.freeTime = req.body.freeTime;
        if (req.body.capability != null) update.capability = req.body.capability;

        let updatedPlayer = await Player.findOneAndUpdate({ _id: req.params.PlayerId }, update, {
            new: true,
            rawResult: true
        });
        res.json(updatedPlayer);
    }
    catch (err) {
        res.json({ errorMessage: err });
    }
})

module.exports = router;