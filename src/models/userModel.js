const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/db/myapp.db');

// Create the users table if it doesn't exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT
        )
    `);
});

// Function to get all users
const getUsers = (callback) => {
    db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
            return callback(err);
        }
        callback(null, rows);
    });
};

// Function to add a new user
const addUser = (name, callback) => {
    const stmt = db.prepare('INSERT INTO users (name) VALUES (?)');
    stmt.run(name, function (err) {
        if (err) {
            return callback(err);
        }
        callback(null, { id: this.lastID, name });
    });
    stmt.finalize();
};

module.exports = { getUsers, addUser };