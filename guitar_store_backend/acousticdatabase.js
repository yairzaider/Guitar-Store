const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./acoustic_guitar_store.db", (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to the SQLite database.");
    }
});


db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS acoustic_guitars (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            price INTEGER NOT NULL,
            image TEXT NOT NULL,
            stock INTEGER NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error("Error creating table:", err.message);
        } else {
            console.log("Acoustic Guitars table ready.");
        }
    });
});

module.exports = db;