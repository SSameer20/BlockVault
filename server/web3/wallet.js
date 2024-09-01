const solanaWallet = require('../solana/solanaWallet')
const ethereumWallet = require('../ethereum/ethereumWallet');

const wallet = async(index, mnemonic) => {

    const solWallet = await solanaWallet(index, mnemonic)
    const ethWallet = await ethereumWallet(index, mnemonic)

    return  {solWallet, ethWallet}
    
}
module.exports = wallet;