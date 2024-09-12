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
      <main className="dark text-foreground bg-background w-full h-screen justify-content-center align-items-center">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/auth' element={<Authentication />} />
            <Route path='/app' element={<App />}>
              <Route path='' element={<WalletGeneration />} />
              <Route path='wallet' element={<Wallet/>} />
              <Route path='wallet/create' element={<CreateWallet/>} />
              <Route path='wallet/import' element={<ImportWallet />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </main>
    </NextUIProvider>
  </StrictMode>,
)
