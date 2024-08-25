const bip39 = require("bip39");
const express = require('express')


const mnemonic = async(req, res) => {
  
  try {
    const mn = bip39.generateMnemonic();
    res.status(201).send({msg:"success", data : mn})
  } catch (error) {
    res.status(404).send({msg : "Error", data : error})
  }
}

const mnemonicToSeed = async(mnemonic) => {
  const seed = bip39.mnemonicToSeed(mnemonic)
  return seed;
}


module.exports = {mnemonic, mnemonicToSeed}