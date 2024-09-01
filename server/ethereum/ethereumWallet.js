const { hdkey } = require('ethereumjs-wallet');
const bip39 = require('bip39');

const ethereumWallet = async (index, mnemonic) => {
   
    try {
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const path = `m/44'/60'/0'/0/${index}`;
    const hdwallet = hdkey.fromMasterSeed(seed);

    const wallet = hdwallet.derivePath(path).getWallet();
    const publicKey = wallet.getAddressString();
    const privateKey = wallet.getPrivateKeyString();
    
    return {
        "public_key": publicKey,
        "private_key": privateKey
    };
    } catch (error) {

        return {
            msg : "error while generating Eth Wallet"
        }
        
    }
};



module.exports = ethereumWallet;