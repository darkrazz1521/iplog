const express = require('express');
const fs = require('fs');
const app = express();

// Generate a random link (unique URL)
app.get('/generate', (req, res) => {
    const uniqueId = Math.random().toString(36).substring(2, 15);
    const link = `http://localhost:3000/${uniqueId}`;
    res.send(`Generated link: <a href="${link}" target="_blank">${link}</a>`);
});

// Log IP address when someone clicks the generated link
app.get('/:id', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent']; // Browser info

    const logEntry = `IP: ${ip}, User-Agent: ${userAgent}, Time: ${new Date().toISOString()}\n`;

    fs.appendFile('logs.txt', logEntry, (err) => {
        if (err) {
            console.error('Error logging IP:', err);
        }
    });

    res.send('Your IP address has been logged.');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
