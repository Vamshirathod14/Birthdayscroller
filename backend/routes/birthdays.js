const express = require('express');
const router = express.Router();
const Birthday = require('../models/Birthday');

// Get all birthdays
router.get('/', async (req, res) => {
    try {
        const birthdays = await Birthday.find();
        res.json(birthdays);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add new birthday
router.post('/', async (req, res) => {
    const birthday = new Birthday({
        name: req.body.name,
        class: req.body.class,
        section: req.body.section,
        hallTicketNumber: req.body.hallTicketNumber,
        photo: req.body.photo,
        birthDate: req.body.birthDate
    });

    try {
        const newBirthday = await birthday.save();
        res.status(201).json(newBirthday);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete birthday
router.delete('/:id', async (req, res) => {
    try {
        await Birthday.findByIdAndDelete(req.params.id);
        res.json({ message: 'Birthday deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;