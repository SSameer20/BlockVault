import React from 'react'
import "../styles/home.css"
import block from '../media/block.png'
import { useNavigate } from 'react-router-dom'




export default function Home() {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/app/wallet/create")
  }

  const handleImport = () => {
    navigate("/app/wallet/import")
  }

  return (
    <div className='home'>
      <div className="intro">
        <h1 id="title">Welcome to <span>BlockVault</span></h1>
        <span className='subtitle'>Lets get started</span>
      </div>
      <div className="button-section">
        <div className="create-btn" onClick={handleCreate}>
          <span>Create Wallet</span>
        </div>
        <div className="import-btn" onClick={handleImport}>
          <span>Import Wallet</span>
        </div>
      </div>
    </div>
  )
}
