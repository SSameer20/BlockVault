import { useState } from 'react'
import './App.css'
import WalletGeneration from './components/WalletGeneration'
import Authentication from './components/Authentication'
import { Outlet } from 'react-router-dom'

function App(props) {
 

  return (
    <div  className='flex flex-col w-full h-screen justify-center items-center'>
      <Outlet>

      </Outlet>
    </div>
  )
}

export default App
