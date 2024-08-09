import React from 'react'
import vault from "../media/vault.png"
import "../styles/loader.css"

export default function 
() {
  return (
    <div className="loader">
        <div className="load">
            <img src={vault} alt="Vault" srcset="" />
            <span>BLOCKVAULT</span>
        </div>
    </div>
  )
}
