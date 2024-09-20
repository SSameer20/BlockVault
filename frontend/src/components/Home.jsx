import React, { useEffect } from 'react'
import Features from './Features';
import { useNavigate } from 'react-router-dom'
import {Button} from "@nextui-org/react";
import "../styles/home.css"
import Wallpaper from './layouts/Wallpaper';
import {getWalletData} from "./Store"


export default function Home() {
  const navigate = useNavigate();
  const handleButton = async () => {
    await walletStore()
    .then(store =>{
      if(store && store.email && store.password) return navigate('/app');
      return navigate('/auth')
    })    
  }
  const handleLogin = () => {
    navigate('/auth')
  }
  
 const walletStore = async() => {
  return await getWalletData();
 }
 


  return (
    <div className='flex flex-col w-full h-screen justify-center items-center home'>
      <Wallpaper />
      <Button size="sm" className='absolute top-5 right-5 z-10' onClick={handleLogin}>Login</Button>
      <div className='flex flex-col w-2/3 main-section'>
        <div className="main flex flex-col items-center">
          <span className='text-5xl font-bold text-center leading-25 w-2/3 p-5 z-1'>Decentralized Crypto Wallet for Solana & Ethereum</span>
          <span className='text-lg font-semibold text-center w-2/5 p-5  text-slate-600 z-1'>Take control of your digital assets with BlockVault, your gateway to decentralized finance.</span>
          <Button color="primary" className='z-10' variant="shadow" onClick={handleButton}>Create Your Wallet</Button>
        </div>
      </div>
    </div>
  )
}
