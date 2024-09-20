import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@nextui-org/react'
import { getWalletData, clearWalletData, saveMnemonic } from './Store'
import Wallpaper from "./layouts/Wallpaper"
import swal from 'sweetalert'
import axios from 'axios'

export default function CreateWallet() {
  const navigate = useNavigate();
  const [create, setCreate] = useState(false)
  const [load, setLoad] = useState(false)

  const fetchWalletData = async () => {
    return await getWalletData();
  }

  const saveMnemonicDataToStore = async (secretEncodedPhrase) => {
    await saveMnemonic({ mnemonic: secretEncodedPhrase })
  }


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



  const handleCreate = async () => {
    setLoad(true);
    try {
      await fetchWalletData()
        .then((store) => {
          if(!store.mnemonic) console.log("No Mnemonic")
          else console.log("Mnemonic " + store.mnemonic)
          if (!store.mnemonic) {
            axios.get("http://localhost:8080/data/mnemonic")
              .then(response => {
                let mn = atob(response.data.data);
                saveKeyToFile(mn);
                //  console.log(mn)   * Testing THe Wallet Store
                saveMnemonicDataToStore(mn);
                swal("Wallet Created", "successfully created", "success")
                setCreate(true);
                return navigate("/app/wallet");
              })
          }
          else {
            swal("Wallet Already Created", "A Wallet Exists Already", "warning");
            setCreate(true);
            return navigate("/app/wallet");
          }
        })
    }
    catch (error) {
      swal("error", "error");
    }

    finally {
      setLoad(false)
    }


  }

  // const handleWallet = async () => {
  //   swal('Wallet Already Created', "success")
  //   return navigate('/app/wallet')
  // }

  return (
    <div className='flex flex-col w-full h-screen justify-center items-center gap-5'>
      <Wallpaper />
      {
        // create ?
          // (<Button color="primary" size='lg' variant="solid" onClick={handleWallet}>Go to Wallet</Button>) :
          <Button color="primary" size='lg' variant="solid" onClick={handleCreate} isLoading={load}>Create Wallet</Button>
      }
      <h1 className='text-2xl text-red-400 w-1/3'>Note : <span className='text-2xl  text-wrap'>{create ? 'Dont Share your Secret Phrase which is downloaded with name private.key' : 'Before creating wallet ensure that to store the phrase in safe area'}</span></h1>
    </div>
  )
}
