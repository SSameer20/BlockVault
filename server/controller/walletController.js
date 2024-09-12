const express = require('express');
const wallet = require('../web3/wallet');
const bip39 = require("bip39");


const createWallet = async(req, res) => {
    try {
        const { index, mnemonic } = req.body
        if (!bip39.validateMnemonic(mnemonic)) {
            return res.status(404).send({msg : "invalid mnemonic"})
        }
        const data = await wallet(index, mnemonic);
        return res.status(201).send({ msg: "success", data: data })
    } catch (error) {
        return res.status(404).send({ msg: "fail", error: error })
    }
}

const validateMnemonic = async(req, res) => {
    try {
        const { mnemonic } = req.body;
        if (!bip39.validateMnemonic(mnemonic)) {
            return res.status(404).send({msg : "invalid mnemonic"})
        }

        return res.status(201).send({msg : "Valid Mnemonic"})

    } catch (error) {
        return res.status(404).send({msg :error})
    }
}


module.exports = {createWallet,validateMnemonic}