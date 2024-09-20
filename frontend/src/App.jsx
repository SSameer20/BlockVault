import './App.css'
import { useState } from 'react'
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
