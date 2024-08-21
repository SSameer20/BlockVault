import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Loader from './components/Loader';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Authenticate from './components/Authenticate';
import Home from './components/Home';
import About from './components/About';
import Profile from './components/Profile';
import Wallet from './components/Wallet';
import CreateWallet from './components/CreateWallet';
import ImportWallet from './components/ImportWallet';


const LoaderWithRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/app");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return <Loader />;
};

const RootComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoaderWithRedirect />} />
        <Route path="/auth" element={<Authenticate />} />
        <Route path="/app" element={<App />}>
          <Route index element={<Home />} />
          <Route path="wallet/create" element={<CreateWallet/>} />
          <Route path="wallet/import" element={<ImportWallet/>} />
          <Route path="wallet" element={<Wallet/>} />
          <Route path="about" element={<About/>} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootComponent />);


reportWebVitals();
