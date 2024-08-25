import React, { useEffect, useState, createContext } from 'react';
import "../styles/createwallet.css";
import { Oval } from 'react-loader-spinner';
import CryptoJS from 'crypto-js';
import swal from 'sweetalert';
import eye from '../media/eye.png';
import hide from '../media/hide.png';
import { saveWalletData, getWalletData } from '../store';
import { useNavigate } from 'react-router-dom';

export const dataContext = createContext(null);

export default function CreateWallet() {
  const navigate = useNavigate();
  const [create, setCreate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mnemonic, setMnemonic] = useState([]);
  const [copy, setCopy] = useState(false);
  const [flag, setFlag] = useState(false);
  const [open, setOpen] = useState(false);

  const password = localStorage.getItem('pass-key');

  useEffect(() => {
    const fetchWalletData = async () => {
      const walletData = await getWalletData();
      if (walletData) {
        try {
          const decryptedMnemonic = CryptoJS.AES.decrypt(walletData.mnemonic, walletData.password).toString(CryptoJS.enc.Utf8);
          setMnemonic(decryptedMnemonic.split(" "));
        } catch (error) {
          console.error("Error decrypting mnemonic:", error);
        }
      }
    };

    fetchWalletData();
  }, []);

  const handleCreateButton = (event) => {
    event.preventDefault();
    setCreate(true);
    if (mnemonic.length > 0) {
      swal("Rejected", "Wallet is Already Created");
    } else {
    }
  };

  const saveKeyToFile = (keyData) => {
    const blob = new Blob([keyData], { type: 'text/plain' });
    const link = document.createElement('a');
    link.download = "private.key";
    link.href = URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  useEffect(() => {
    if (create && mnemonic.length === 0) {
      setLoading(true);
      fetch("http://localhost:8080/data/mnemonic", {
        method: 'GET'
      })
        .then(response => response.json())
        .then(async data => {
          const encryptedData = CryptoJS.AES.encrypt(data.data, password).toString();
          await saveWalletData({
            mnemonic: encryptedData,
            password: password,  // Consider further securing this
            solanaWalletIndex: 0,
            ethereumWalletIndex: 0
          });
          setMnemonic(data.data.split(" "));
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [create, password]);

  const handleCopy = () => {
    if (!copy) {
      navigator.clipboard.writeText(mnemonic.join(" ")).then(() => {
        swal("Copied", "Secret Phrase Copied Successfully", "success");
        saveKeyToFile(mnemonic.join(" "));
        setCopy(true);
      }).catch(err => {
        alert('Failed to copy: ', err);
      });
    }
  };



  return (
    <dataContext.Provider value={mnemonic}>
      <div className='create-wallet'>
        <div className="create-btn">
          {create ? (<span onClick={()=> navigate('/app/wallet')}>Go to Wallet</span>) : (<span onClick={handleCreateButton}>Create Wallet</span>)}
        </div>

        {loading && (
          <div className="loading">
            <Oval
              visible={true}
              height="40"
              width="40"
              color="blue"
              ariaLabel="oval-loading"
            />
          </div>
        )}
        {
          create && (
            <span style={{ display: 'flex', flexDirection:"column",justifyContent: "center", alignItems : "center", color: 'red' }}>
              Please Note that Secret Phrase is very private. Losing the key can result in your account being hacked
              <img src={open ? eye : hide} style={{ height: "40px", padding : "10px 20px", marginTop : "20px" }} onClick={() => { setFlag(prev => !prev); setOpen(!open) }}></img>
            </span>
          )
        }

        {create && flag === true && (
          <div className="word-section">
            {mnemonic.map((item, index) => (
              <div key={index} className='data'>
                <span className='data-col'>{item}</span>
              </div>
            ))}
            <span id='copy-btn' onClick={handleCopy}>
              {copy ? "copied" : "copy"}
            </span>
          </div>
        )}

        {/* {create && (
          <div className="wallet-types">
            <div className="wallet-btn">Solana</div>
            <div className="wallet-btn">Ethereum</div>
          </div>
        )} */}
      </div>
      
    </dataContext.Provider>
  );
}
