const express = require('express');
const { Mongoose } = require('mongoose');
const router = express.Router();
const Player = require('../models/Player');

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
        res.json({ message: err });
    }
})

//Get some
// router.get('/house/:houseName', async (req, res) => {
//     try {
//         const chars = await Player.find({ house: req.params.houseName });
//         res.json(chars);
//     } catch (err) {
//         res.json({ message: err });
//     }
// })

// Post one new
router.post('/', (req, res) => {

    const newPlayer = new Player({
        name: req.body.name,
        displayName: req.body.displayName.replace(/\s+/g, ''),
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
            res.json({ message: err });
        });
})

// Delete one by Id
router.delete('/:PlayerId', async (req, res) => {
    try {
        const removedPlayer = await Player.remove({ _id: req.params.PlayerId })
        res.json(removedPlayer);
    }
    catch (err) {
        res.json({ message: err });
    }
})

// Update one by Id
router.patch('/:PlayerId', async (req, res) => {
    try {
        const update = {};
        if (req.body.name != null) update.name = (req.body.name);
        if (req.body.displayName != null) update.displayName = (req.body.displayName);
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
        res.json({ message: err });
    }
})



module.exports = router;