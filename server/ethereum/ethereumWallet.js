const { hdkey } = require('ethereumjs-wallet');
const bip39 = require('bip39');

const ethereumWallet = async (mnemonic) => {
   
try {
    const ethWallet = []
    for(let index = 0; index < 4; index++){
        let seed = bip39.mnemonicToSeedSync(mnemonic);
        let path = `m/44'/60'/0'/0/${index}`;
        let hdwallet = hdkey.fromMasterSeed(seed);
        let wallet = hdwallet.derivePath(path).getWallet();
        let publicKey = wallet.getAddressString();
        let privateKey = wallet.getPrivateKeyString();
        
        ethWallet.push({
            "index" : index,
            "public_key": publicKey,
            "private_key": privateKey
        })
    }
    
    return ethWallet
    } catch (error) {

        return {
            msg : "error while generating Eth Wallet"
        }
        
    }
};



module.exports = ethereumWallet;