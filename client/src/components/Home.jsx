import React from 'react'
import "../styles/home.css"
import block from '../media/block.png'
import {useNavigate} from 'react-router-dom'




export default function Home() {
  const navigate = useNavigate();

  const handleWallet = () => {

    navigate("/app/wallet")

  }
  return (
    <div className='home'>
      <div className="home-information">
  
        <span>Your Gateway to Secure Crypto Management</span>
        <div className='home-button' onClick={handleWallet}>Connect Wallet</div>
        
        
      </div>
      <div className="home-image">
        <img src={block} alt="" srcset="" />
      </div>
    </div>
  )
}
