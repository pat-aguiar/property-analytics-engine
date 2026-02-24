const express = require('express');
const router = express.Router();
const analyticsService = require('../../../core/AnalyticsService');

router.post('/:id/view', async (req, res) => {
    try {
        const views = await analyticsService.trackView(req.params.id);
        res.status(200).json({ propertyId: req.params.id, totalViews: views });
    } catch (error) {
        res.status(500).json({ error: 'Failed to track view' });
    }
});

module.exports = router;