const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const employeeRoutes = require('./routes/employee_routes');
const userRoutes = require('./routes/user_routes');

const app = express();
app.use(express.json());

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'assignment1'
}).then(() => {
    console.log('Successfully connected to the database mongoDB Atlas Server');    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(cors({ origin: 'https://comp3123-a2-api-43405.herokuapp.com', optionsSuccessStatus: 200 }));

app.use('/api/emp', employeeRoutes);
app.use('/api/user', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});