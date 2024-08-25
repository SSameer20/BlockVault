const express = require("express");
const app = express();
const path = require('path');
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require("cors")
const bodyParser = require('body-parser')
const { mnemonic, mnemonicToSeed } = require('./web3/seedPhrase');


// Middleware
app.use(cors());
// {
//   origin: 'http://localhost:3000', 
//   methods: 'GET,POST,PUT,DELETE',
// }
app.use(bodyParser.json())


// const DB = async () => {
//     const con = await mongoose.connect(process.env.MONGO_URI)
//     if (!con) console.log("Error")
//     else console.log("Connected")
// }

// DB();


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/templates/index.html'));
});


app.get('/data/mnemonic', mnemonic);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
