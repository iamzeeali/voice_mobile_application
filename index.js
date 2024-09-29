const express = require('express');
const app = express();
const port = 3000;

// Serve static frontend files
app.use(express.static('public'));

// Use JSON parsing for API requests
app.use(express.json());

// Route for serving the frontend
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// API Route (from `src/routes/apiRoutes.js`)
const apiRoutes = require('./src/routes/apiRoutes');
app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});