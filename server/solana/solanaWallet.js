const { mnemonicToSeedSync } = require('bip39');
const { mnemonic, mnemonicToSeed } = require('../web3/seedPhrase');


const mn =  mnemonic();
const createSolanaWallet = async(mn) => {
   const seed = mnemonicToSeed(mn);
   return {
    mn,
    seed
   };
}


