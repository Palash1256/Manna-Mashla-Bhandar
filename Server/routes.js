const express = require('express');
const router = express.Router();
const multer = require('multer');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const fetch = require('node-fetch');

const upload = multer({ storage: multer.memoryStorage() });

// Enable CORS
router.use(cors());

// Root endpoint
router.get('/', (req, res) => {
    res.send('Hello, world!');
});


router.get('/customers-data', async (req, res) => {
    const sheetId = process.env.SHEET_ID;
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

    try {
        const response = await fetch(url);
        const text = await response.text();
        // Remove Google JSONP padding
        const json = JSON.parse(text.substr(47).slice(0, -2));
        // Convert rows to array of objects
        const cols = json.table.cols.map(col => col.label);
        const data = json.table.rows.map(row => {
            const obj = {};
            row.c.forEach((cell, i) => {
                obj[cols[i]] = cell ? cell.v : '';
            });
            return obj;
        });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch Google Sheet data' });
    }
});





// New endpoint to send Customer.json data



// router.get('/customers', (req, res) => {
//     const filePath = path.join(__dirname, 'Customer.json');
//     if (!fs.existsSync(filePath)) {
//         return res.json([]);
//     }
//     try {
//         const fileContent = fs.readFileSync(filePath, 'utf8');
//         const data = fileContent ? JSON.parse(fileContent) : [];
//         res.json(data);
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to read customer data' });
//     }
// });

router.post('/upload-user', upload.single('file'), (req, res) => {
    console.log(req.file)
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
        console.log("WorkBook\n", workbook)
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        console.log("Sheet\n", sheet)
        const data = XLSX.utils.sheet_to_json(sheet);
        console.log("ExelDdata", data)

        // Validate columns
        const requiredColumns = ['Name', 'Address', 'Due'];
        const hasRequiredColumns = data.length > 0 && requiredColumns.every(col => Object.keys(data[0]).includes(col));
        if (!hasRequiredColumns) {
            return res.status(400).json({ error: 'Excel file must contain columns: Name, Address, Due' });
        }

        // Save data to Customer.json, update Due if Name+Address exists, remove others
        const filePath = path.join(__dirname, 'Customer.json');
        let existingData = [];
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            if (fileContent) {
                existingData = JSON.parse(fileContent);
            }
        }

        // Map for quick lookup of existing data by Name+Address
        const key = (item) => `${item.Name}|||${item.Address}`;
        const existingMap = new Map(existingData.map(item => [key(item), item]));

        // Track inserted and updated
        let inserted = 0, updated = 0;
        // New map for only the uploaded data
        const newMap = new Map();

        data.forEach(item => {
            const k = key(item);
            if (existingMap.has(k)) {
                // Update existing customer
                const existing = existingMap.get(k);
                existing.Address = item.Address;
                existing.Due = item.Due;
                existing.Name = item.Name;
                newMap.set(k, existing);
                updated++;
            } else {
                // Insert new customer
                newMap.set(k, item);
                inserted++;
            }
        });

        // Only keep customers present in the new upload
        const mergedData = Array.from(newMap.values());
        fs.writeFileSync(filePath, JSON.stringify(mergedData, null, 2), 'utf8');

        res.json({ message: 'File processed successfully', inserted, updated });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Failed to process Excel file' });
    }
});

module.exports = router;
