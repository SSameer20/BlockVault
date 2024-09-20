const bip39 = require('bip39');
const { derivePath } = require('ed25519-hd-key');
const web3 = require('@solana/web3.js');
const bs58 = require('bs58');

const solanaWallet = async (mnemonic) => {
    const solWallet = []
    for (let index = 0; index < 4; index++) {
        let seed = bip39.mnemonicToSeedSync(mnemonic);
        let path = `m/44'/501'/${index}'/0'`;
        let derivedSeed = derivePath(path, seed.toString('hex')).key;
        let wallet = web3.Keypair.fromSeed(derivedSeed.slice(0, 32));
        solWallet.push({
            "index" : index,
            "public_key": wallet.publicKey.toString(),
            "private_key": bs58.encode(wallet.secretKey)
        })
    }


    return solWallet;
}

// console.log(solanaWallet(2, mn))
module.exports = solanaWallet;