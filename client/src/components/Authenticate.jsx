import React, { useState } from 'react'
import "../styles/auth.css"
import profile from "../media/profile.jpg"
import punk from "../media/punk.jpg"

export default function Authenticate() {
  const [form, setForm] = useState(true)

  const handleForm = () => {
    setForm(!form)

  }
  return (
    <div className='authentication'>
      <div className="form">
        <div className="form-btn">
          <div className={form ? 'active' : 'absent'} onClick={handleForm}>Login</div>
          <div className={form ? 'absent' : 'active'} onClick={handleForm}>Register</div>
        </div>
        {
          form ? ( <div className="login">
          <img src={profile} alt="" />
          <input type="email" name="email" id="login-email" placeholder='email' />
          <input type="password" name="password" id="login-password" placeholder='password' />
          <div className="btn">
            UNLOCK
          </div>
        </div>) : (<div className="register">
          <img src={punk} alt="" />
          <input type="email" name="email" id="register-email" placeholder='email' />
          <input type="password" name="password" id="register-password" placeholder='password' />
          <input type="password" name="re-password" id="register-re-password" placeholder='confirm password' />
          <div className="btn">
            Register
          </div>
        </div>)
        }
      </div>

    </div>
  )
}
