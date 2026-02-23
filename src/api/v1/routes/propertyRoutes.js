const express = require('express');
const router = express.Router();

// Mock route for initial setup
router.get('/', (req, res) => {
    res.json({ version: 'v1', status: 'active' });
});

module.exports = router;