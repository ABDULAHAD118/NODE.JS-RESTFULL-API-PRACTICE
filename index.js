require('dotenv').config();
const express = require('express');

const connection = require('./connection')

const userRoute = require('./routes/users');

const app = express();
const port = process.env.PORT;

connection(process.env.MONGO_URL)
    .then(() =>
        console.log('Database Connected Successfully'
        )).catch((err) => {
            console.error('Database Error', err);
        })

app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoute);


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})