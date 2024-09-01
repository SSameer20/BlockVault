import React, { useState } from 'react';
import "../styles/auth.css";
import profile from "../media/profile.jpg";
import punk from "../media/punk.jpg";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { savePassword } from '../store';

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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [rEmail, setREmail] = useState('')
  const [rPassword, setRPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [load, setLoad] = useState(false);

  const handleForm = () => {
    setForm(!form);
  };


  const saveToIndex = async(password) => {
      await savePassword({password})
  }

  const handleLogin = async() => {
    if(password === "" || email === "") {
      setPassword('');
      setLoad(false);
      return  swal('Details Required', "All details are required", "error")
    }
    try {
      axios.post("http://localhost:8080/user/login", {
        "email": email,
        "password": password
      })
      .then((response) =>{
        saveToIndex(response.data.data.password)
        swal("Logged In", "Successfully Logged In", "success");
        setPassword('');
        setLoad(false);
        setTimeout(() => {
          if(response.data.wallet_count === 0) navigate("/app/")
          else navigate("/app/")
        }, 2000)
      })
      .catch((error) => {
        swal('Wrong Credentials', "Error in Logging in", "error")
        setPassword('');
        setEmail('')
        setLoad(false);
      })
    } catch (error) {
      swal("Error", "Error While Singing In", "success");
      setPassword('');
      setEmail('')
      setLoad(false);
    }
  };

  const handleRegister = async() => {
    try {
    if(rPassword === "" || rEmail === "")  {
      setRPassword('');
        setRePassword('');
        setREmail('');
      setLoad(false);
      return  swal('Details Required', "All details are required", "error")
    }

    if(rPassword !== rePassword){
      setRPassword('');
        setRePassword('');
        setREmail('');
      setLoad(false);
      return  swal('No Match', "Password dont match", "error")
    }
    
      axios.post("http://localhost:8080/user/register", {
        "email": rEmail,
        "password": rPassword
      })
      .then((response) => {
        swal("Created", "Successfully Registered", "success");
        setRPassword('');
        setRePassword('');
        setREmail('');
        setLoad(false);
        setTimeout(() => {
          // ;
          if(response.data.wallet_count === 0) navigate("/app/")
          else navigate("/app/wallet")
        }, 2000)
      })
    } catch (error) {
      swal("Error", "Error While Singing In", "error");
      setRPassword('');
        setRePassword('');
        setREmail('');
      setLoad(false);
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
                type="email"
                name="email"
                id="login-email"
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                name="password"
                id="login-password"
                placeholder='Password'
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
                type="email"
                name="email"
                id="register-email"
                placeholder='Email'
                value={rEmail}
                onChange={(e) => setREmail(e.target.value)}
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder='password'
                value={rPassword}
                onChange={(e) => setRPassword(e.target.value)}
              />
              <input
                type="password"
                name="re-password"
                id="register-re-password"
                placeholder='confirm password'
                value={rePassword}
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
