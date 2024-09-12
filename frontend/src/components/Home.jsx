import React, { useEffect } from 'react'
import "../styles/home.css"
import { useNavigate } from 'react-router-dom'
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import Features from './Features';



export default function Home() {
  const navigate = useNavigate();

  const handleButton = () => {
      navigate('/app')
  }
  
  return (
    <>
      <div className='flex flex-col w-full h-screen justify-center items-center main-section'>
          <span className='text-5xl font-bold text-center leading-25 w-1/2 p-5 '>Decentralized Crypto Wallet for Solana & Ethereum</span>
          <span className='text-lg font-semibold text-center w-2/5 p-5  text-slate-600'>Take control of your digital assets with BlockVault, your gateway to decentralized finance.</span>
          <Button color="primary" variant="shadow" onClick={handleButton}>Create Your Wallet</Button>
      </div>
      <Features />

    </>
  )
}
