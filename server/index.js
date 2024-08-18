require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoute = require('./routes/userRoute');
const testRoute = require('./routes/testRoute');
const questionRoute = require('./routes/questionRoute');
const submissionRoute = require('./routes/submissionRoute');

const app = express();
app.use(express.json());

//connect MongoDB
connectDB();

//Routes
app.use('/api/auth', userRoute); 
app.use('/api/tests', testRoute);
app.use('/api/questions', questionRoute);
app.use('/api/submissions', submissionRoute);

const PORT = process.env.PORT || 2500;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;