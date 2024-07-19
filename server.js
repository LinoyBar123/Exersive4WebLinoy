const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const preferenceRoutes = require('./routes/preferences');

const app = express();
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/preferences', preferenceRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
