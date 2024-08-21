import React, { useState } from 'react'
import "../styles/createwallet.css"
import { Oval } from 'react-loader-spinner'

export default function CreateWallet() {
  const [create, setCreate] = useState(false);
  const [load, setLoad] = useState(true)
  return (
    <div className='create-wallet'>
        <div className="create-btn" onClick={(e)=>setCreate(!create)}>
          {
            load ? (
              <Oval
              visible={true}
              height="40"
              width="40"
              color="blue"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
              />
            ) : 
                (create ? (<span>Wallet Created</span>) : (<span>Create Wallet</span>))
          }
         
        </div>
    </div>
  )
}
