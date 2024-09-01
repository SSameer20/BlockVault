const bip39 = require('bip39');
const { derivePath } = require('ed25519-hd-key');
const web3 =  require('@solana/web3.js');
const bs58 = require('bs58');

const solanaWallet = async(index, mnemonic) => {
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${index}'/0'`; 
    const derivedSeed = derivePath(path, seed.toString('hex')).key;
    const wallet = web3.Keypair.fromSeed(derivedSeed.slice(0, 32));
    
    return {
        "public_key" : wallet.publicKey.toString(),
        "private_key" : bs58.encode(wallet.secretKey)
    }
}

// console.log(solanaWallet(2, mn))
module.exports = solanaWallet;