import React from 'react'
import { Link } from "react-router-dom"
import "../styles/navigation.css"
import vault from "../media/vault.png"

export default function Navigation() {
    return (
        <nav>
            <div className="logo">
                <img src={vault} alt="Vault" srcset="" />
                <span>BLOCKVAULT</span>
            </div>

            <ul>
                <li>
                    <Link to="/app">Home</Link>
                </li>
                <li>
                    <Link to="/app/wallet">Wallet</Link>
                </li>
                <li>
                    <Link to="/app/about">About</Link>
                </li>
                <li>
                    <Link to="/app/profile">Profile</Link>
                </li>
            </ul>
        </nav>
    )
}
