const bip39 = require("bip39");

/*
  * mnemonic
  * creates a mnemonic phrase that consists of 12 words which is used to generate keyPair
  * @example
  * sam *** *** *** *** *** *** *** *** *** *** kite
  * Encoded = btoa(`secret phase`)
  * convert into encoded format ghvshxbjnxwdjdnjwcxwdcnxiuhwuixhwuxjmowxo and send to user
  * Decoded = atob(`Encoded Phrase`)
*/

const mnemonic = async (req, res) => {
  try {
    const mn = btoa(bip39.generateMnemonic());
    res.status(201).send({ msg: "success", data: mn })
  } catch (error) {
    res.status(404).send({ msg: "Error", data: error })
  }
}

const mnemonicToSeed = async (mnemonic) => {
  const seed = bip39.mnemonicToSeed(mnemonic)
  return seed;
}


module.exports = { mnemonic, mnemonicToSeed }