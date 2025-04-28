const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000; // Backend runs on port 5000

// Middleware
app.use(cors()); // Allow requests from other origins
app.use(express.json()); // Parse JSON request bodies

// Example API endpoint
app.get('/api/message', (req, res) => {
    res.json({ message: 'Hello from Express!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
