import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'
import App from './App.jsx'
import './index.css'
import Authentication from './components/Authentication.jsx'
import CreateWallet from './components/CreateWallet.jsx'
import WalletGeneration from './components/WalletGeneration.jsx'
import ImportWallet from './components/ImportWallet.jsx'
import Wallet from './components/Wallet.jsx'
import Home from './components/Home.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NextUIProvider>
      <main className="dark text-foreground bg-background w-full h-screen justify-content-center align-items-center font-rubik index">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/auth' element={<Authentication />} />
            <Route path='/app' element={<App />}>
              <Route index element={<WalletGeneration />} />
              <Route path='wallet/' element={<Wallet/>} />
              <Route path='wallet/create/' element={<CreateWallet/>} />
              <Route path='wallet/import/' element={<ImportWallet />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <span className="absolute bottom-5 left-[46vw] z-10 text-center">Made by <strong><a href="https://github.com/SSameer20" target='_blank' rel="noopener noreferer">Sameer</a></strong></span>
      </main>
    </NextUIProvider>
  </StrictMode>
)
