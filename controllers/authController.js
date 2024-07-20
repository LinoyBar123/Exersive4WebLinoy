const db = require('../db');

exports.registerUser = (req, res) => {
    console.log(db);
    const { username, password, accessCode } = req.body;
    const sql = 'INSERT INTO tbl_100_users (username, password, accessCode) VALUES (?, ?, ?)';
    db.query(sql, [username, password, accessCode], (err, results) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
};

exports.loginUser = (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM tbl_100_users WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const user = results[0];
        if (user.password !== password) {  
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful', accessCode: user.accessCode });
    });
};
