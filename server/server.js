const express = require("express");
const app = express();
const path = require('path');
const mongoose = require('mongoose')
const cors = require("cors")
const bodyParser = require('body-parser')
const { mnemonic, mnemonicToSeed } = require('./web3/seedPhrase');
const {createUser, loginUser} = require('./controller/userController')
const {createWallet} = require('./controller/walletController')
require('dotenv').config()

// Middleware
app.use(cors());
app.use(bodyParser.json())


const DB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI)
        if (con)  console.log("Connected")
    } catch (error) {
        console.log("Connected")
    }
}

DB();


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/templates/index.html'));
});

// User Routes
app.post('/user/register',createUser);
app.post('/user/login', loginUser)
// Wallet Routes
app.get('/data/mnemonic', mnemonic);
app.post("/create/wallet", createWallet)





const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
