const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose')
require('dotenv').config()



const DB = async () => {
    const con = await mongoose.connect(process.env.MONGO_URI)
    if (!con) console.log("Error")
    else console.log("Connected")
}

DB();


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/templates/index.html'));
});


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
