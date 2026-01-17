const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');
const app = express();

app.use(cors()); 
app.use(express.json());
app.use(express.static('public'));

// IMPORTANT: Replace the ID below with the one from SheetDB.io
const SHEETDB_URL = 'https://sheetdb.io/api/v1/9ctsom14yft3h'; 

app.post('/api/submit', async (req, res) => {
    console.log(">>> Request received:", req.body);
    try {
        const data = req.body;
        const submissionData = {
            ...data,
            submissionDate: new Date().toLocaleString()
        };

        const response = await fetch(SHEETDB_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: [submissionData] })
        });

        if (response.ok) {
            console.log("✅ Success: Data pushed to Google Sheets");
            res.status(200).send('Saved');
        } else {
            const errorText = await response.text();
            console.error("❌ SheetDB Error:", errorText);
            res.status(500).send('SheetDB Error');
        }
    } catch (err) {
        console.error("❌ Connection Error:", err);
        res.status(500).send('Server Error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`-------------------------------------------`);
    console.log(`FormFlow Server is ACTIVE on port ${PORT}`);
    console.log(`-------------------------------------------`);
});