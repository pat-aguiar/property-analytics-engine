const express = require('express');
const v1Routes = require('./api/v1/routes/propertyRoutes');

const app = express();
app.use(express.json());

// API Versioning for Architectural Evolution
app.use('/api/v1/properties', v1Routes);

module.exports = app;