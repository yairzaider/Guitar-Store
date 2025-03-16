//setup:
const express = require('express');
const cors = require('cors');
const path = require("path");

const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const electricdbPath = path.join(__dirname, 'guitar_store.db');

const electricdb = new sqlite3.Database(electricdbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error("Error connecting to database:", err.message);
    } else {
        console.log("Connected to the electric guitar database.");
    }
});



const acousticDbPath = path.join(__dirname, 'acoustic_guitar_store.db');
const acousticDb = new sqlite3.Database(acousticDbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error("Error connecting to acoustic guitar database:", err.message);
    } else {
        console.log("Connected to the acoustic guitar database.");
    }
});





 
app.get('/inventory', (req, res) => {
    const sql = "SELECT * FROM guitars";
    
    electricdb.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: "Database error", details: err.message });
        }
        res.json(rows);
    });
});


app.get('/acoustic-inventory', (req, res) => {
    const sql = "SELECT * FROM acoustic_guitars";

    acousticDb.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: "Database error", details: err.message });
        }
        res.json(rows);
    });
});








app.post('/purchase', (req, res) => {
    const { guitarId } = req.body;

    const checkStockSQL = "SELECT stock FROM guitars WHERE id = ?";
    electricdb.get(checkStockSQL, [guitarId], (err, row) => {
        if (err) {
            return res.status(500).json({ error: "Database error", details: err.message });
        }

        if (!row) {
            return res.status(404).json({ message: "Guitar not found." });
        }

        if (row.stock > 0) {
            const updateStockSQL = "UPDATE guitars SET stock = stock - 1 WHERE id = ?";
            electricdb.run(updateStockSQL, [guitarId], function (updateErr) {
                if (updateErr) {
                    return res.status(500).json({ error: "Database update error", details: updateErr.message });
                }
                // Return updated stock value
                return res.json({ message: "Purchase successful!", stock: row.stock - 1 });
            });
        } else {
            return res.status(400).json({ message: "Sorry, this guitar is out of stock." });
        }
    });
});



app.post('/purchase-acoustic', (req, res) => {
    const { guitarId } = req.body;

    const checkStockSQL = "SELECT stock FROM acoustic_guitars WHERE id = ?";
    acousticDb.get(checkStockSQL, [guitarId], (err, row) => {
        if (err) {
            return res.status(500).json({ error: "Database error", details: err.message });
        }

        if (!row) {
            return res.status(404).json({ message: "Guitar not found." });
        }

        if (row.stock > 0) {
            const updateStockSQL = "UPDATE acoustic_guitars SET stock = stock - 1 WHERE id = ?";
            acousticDb.run(updateStockSQL, [guitarId], function (updateErr) {
                if (updateErr) {
                    return res.status(500).json({ error: "Database update error", details: updateErr.message });
                }
                return res.json({ message: "Purchase successful!", stock: row.stock - 1 });
            });
        } else {
            return res.status(400).json({ message: "Sorry, this guitar is out of stock." });
        }
    });
});










// Start server
app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});