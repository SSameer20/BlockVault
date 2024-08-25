import React, { useState } from 'react';
import "../styles/auth.css";
import profile from "../media/profile.jpg";
import punk from "../media/punk.jpg";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";

const Load = () => {
  return (
    <div className='btn-loader'>
      <div className="btn-load"></div>
    </div>
  );
};

export default function Authenticate() {
  const navigate = useNavigate();
  const [form, setForm] = useState(true);
  const [password, setPassword] = useState('');
  const [rpassword, setRPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [load, setLoad] = useState(false);

  const handleForm = () => {
    setForm(!form);
  };

  const handleLogin = () => {
    setLoad(true);
    const pass = localStorage.getItem('pass-key');
    if (!pass || pass !== password) {
      swal("Incorrect", "Please use correct password", "error");
      setPassword('');
      setLoad(false);
    } else {
      swal("Logged In", "Successfully Logged In", "success");
      setPassword('');
      setLoad(false);
      setTimeout(()=>{
        navigate("/app/");
      }, 2000)
    }
  };

  const handleRegister = () => {
    if (rpassword !== repassword) {
      swal("Mismatch", "Enter the same password", "error");
      setRPassword("");
      setRePassword("");
    } else {
      localStorage.setItem('pass-key', rpassword);
      swal("Registered", "Successfully registered", "success");
      setRPassword("");
      setRePassword("");
      setTimeout(()=>{
        navigate("/app/");
      }, 2000)
    }
  };

  return (
    <div className='authentication'>
      <div className="form">
        <div className="form-btn">
          <div className={form ? 'active' : 'absent'} onClick={handleForm}>Login</div>
          <div className={form ? 'absent' : 'active'} onClick={handleForm}>Register</div>
        </div>
        {
          form ? (
            <div className="login">
              <img src={profile} alt="Profile" />
              <input 
                type="password" 
                name="password" 
                id="login-password" 
                placeholder='password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <div className="btn" onClick={handleLogin}>
                {
                  load ? (
                    <Load />
                  ) : (
                    <span>UNLOCK</span>
                  )
                }
              </div>
            </div>
          ) : (
            <div className="register">
              <img src={punk} alt="Punk" />
              <input 
                type="password" 
                name="password" 
                id="register-password" 
                placeholder='password'
                value={rpassword}
                onChange={(e) => setRPassword(e.target.value)} 
              />
              <input 
                type="password" 
                name="re-password" 
                id="register-re-password" 
                placeholder='confirm password' 
                value={repassword}
                onChange={(e) => setRePassword(e.target.value)} 
              />
              <div className="btn" onClick={handleRegister}>
                Register
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}
