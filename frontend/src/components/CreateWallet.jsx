import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import swal from 'sweetalert'
import axios from 'axios'
import { Button } from '@nextui-org/react'
import {getWalletData} from './Store'

export default function CreateWallet() {
  const [create, setCreate] = useState(false)
  const [load, setLoad] = useState(false)
  const navigate = useNavigate();

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



  const handleCreate = async() => {
      setLoad(true);
      const walletData = await getWalletData();

      if(walletData.mnemonic){
        console.log(walletData.mnemonic);
        swal("Wallet Exists", "You have Already created a Wallet", "warning")
        return setCreate(true)
      }
      else{
        axios.get("http://localhost:8080/data/mnemonic")
        .then((response) => {
            const data = response.data
            saveKeyToFile(atob(data))
            swal("Wallet Created", "secret phrase is created", "success")
        })
        .catch((err) => {
            swal(err,"error")
        })
      }

      setTimeout(() => {
        setLoad(false);
      }, 2000);

  }

  const handleWallet = () => {
      setTimeout(() => {
        navigate('/app/wallet')
      },1000)
  }

 
  return (
    <div className='flex flex-col w-full h-screen justify-center items-center gap-5'>
      {
      create ? 
        (<Button color="primary" size='lg' variant="solid" onClick={handleWallet}>Go to Wallet</Button>):
        (<Button color="primary" size='lg' variant="solid" onClick={handleCreate} isLoading={load}>Create Wallet</Button>)
      }
      <h1 className='text-2xl text-red-400 w-1/3'>Note : <span className='text-2xl  text-wrap'>{create ? 'Dont Share your Secret Phrase which is downloaded with name private.key' : 'Before creating wallet ensure that to store the phrase in safe area' }</span></h1>
    </div>
  )
}
