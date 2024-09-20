const solanaWallet = require('../solana/solanaWallet')
const ethereumWallet = require('../ethereum/ethereumWallet');

const wallet = async(mnemonic) => {

    const solWallet = await solanaWallet(mnemonic)
    const ethWallet = await ethereumWallet( mnemonic)

    return  {solWallet, ethWallet}
    
}
module.exports = wallet;