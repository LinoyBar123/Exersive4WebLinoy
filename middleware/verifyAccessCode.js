const db = require('../db');

const verifyAccessCode = (req, res, next) => {
    const { userId, accessCode } = req.body;

    const sql = 'SELECT accessCode FROM tbl_100_users WHERE id = ?';
    
    db.query(sql, [userId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userAccessCode = results[0].accessCode;

        if (userAccessCode !== accessCode) {
            return res.status(403).json({ message: 'Invalid access code' });
        }

        next(); // אם הכל בסדר, נמשיך לפונקציה הבאה
    });
};

module.exports = verifyAccessCode;
