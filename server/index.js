const express = require('express');
const connectDB = require('./db/db');

//connect MongoDB
connectDB();

const authRoutes = require('./router/authRoute');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json("hello Arsh");
})

// Use authentication routes
app.use('/api/auth', authRoutes);

app.listen(2500, () => {
    console.log(`http://localhost:2500/`);
})

module.exports = app;