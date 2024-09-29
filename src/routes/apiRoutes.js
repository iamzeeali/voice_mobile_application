const express = require('express');
const router = express.Router();
const { getUsers, addUser } = require('../models/userModel');

// GET route to fetch users from the database
router.get('/users', (req, res) => {
    getUsers((err, users) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch users' });
        }
        res.json(users);
    });
});

// POST route to add a new user to the database
router.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    addUser(name, (err, newUser) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to add user' });
        }
        res.status(201).json(newUser);
    });
});

module.exports = router;