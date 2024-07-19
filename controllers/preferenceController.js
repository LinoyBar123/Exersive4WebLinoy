const db = require('../db');

exports.addPreference = (req, res) => {
    const { userId, startDate, endDate, destination, vacationType } = req.body;

    const sql = 'INSERT INTO tbl_100_preferences (userId, startDate, endDate, destination, vacationType) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [userId, startDate, endDate, destination, vacationType], (err, results) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ message: 'Preference added successfully' });
    });
};

exports.getPreferences = (req, res) => {
    const sql = 'SELECT * FROM tbl_100_preferences';
    
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

exports.calculateResults = async (req, res) => {
    const sql = 'SELECT * FROM tbl_100_preferences';
    db.query(sql, (err, preferences) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        if (preferences.length < 5) {
            return res.status(400).json({ message: 'Waiting for all preferences from the group.' });
        }

        const destinationCounts = {};
        const vacationTypeCounts = {};
        const dateRanges = [];

        preferences.forEach(pref => {
            destinationCounts[pref.destination] = (destinationCounts[pref.destination] || 0) + 1;
            vacationTypeCounts[pref.vacationType] = (vacationTypeCounts[pref.vacationType] || 0) + 1;
            dateRanges.push({ startDate: new Date(pref.startDate), endDate: new Date(pref.endDate) });
        });

        const selectedDestination = Object.keys(destinationCounts).reduce((a, b) => 
            destinationCounts[a] > destinationCounts[b] ? a : b
        );

        const selectedVacationType = Object.keys(vacationTypeCounts).reduce((a, b) => 
            vacationTypeCounts[a] > vacationTypeCounts[b] ? a : b
        );

        // קביעת תאריכים חופפים
        let finalStartDate = dateRanges[0].startDate;
        let finalEndDate = dateRanges[0].endDate;

        dateRanges.forEach(range => {
            finalStartDate = new Date(Math.max(finalStartDate, range.startDate));
            finalEndDate = new Date(Math.min(finalEndDate, range.endDate));
        });

        // אם אין חפיפה
        if (finalStartDate > finalEndDate) {
            return res.status(400).json({ message: 'No overlapping dates available for all preferences.' });
        }

        res.status(200).json({
            destination: selectedDestination,
            vacationType: selectedVacationType,
            dates: {
                startDate: finalStartDate,
                endDate: finalEndDate
            }
        });
    });
};
