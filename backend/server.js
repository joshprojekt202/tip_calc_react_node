const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Apply middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON body in requests

const port = 3001;

// Calculate Tip Endpoint
app.post('/calculate', (req, res) => {
    const { billAmount, serviceQuality, numberOfPeople } = req.body;
    // Ensure the inputs are valid
    if (!billAmount || !serviceQuality || !numberOfPeople) {
        return res.status(400).json({ message: "Invalid input" });
    }
    
    try {
        const totalTip = billAmount * (serviceQuality / 100);
        const tipPerPerson = totalTip / numberOfPeople;
        res.json({ tipPerPerson });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while calculating the tip." });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});