import React, { useState } from 'react'
import "../styles/auth.css"
import profile from "../media/profile.jpg"
import punk from "../media/punk.jpg"

const Load = () => {
  return( 
    <div className='btn-loader'>
      <div className="btn-load">

      </div>
    </div>
  )
}

export default function Authenticate() {
  const [form, setForm] = useState(true)

  const handleForm = () => {
    setForm(!form)
  }

  const [load, setload] = useState(false)
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
            {
              form && load ? (
                <Load />
              ) : (<span>UNLOCK</span>)
            }
            
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
