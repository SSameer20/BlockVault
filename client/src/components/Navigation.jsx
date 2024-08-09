import React from 'react'
import {Link} from "react-router-dom"
import "../styles/navigation.css"

export default function Navigation() {
  return (
    <nav>
        <ul>
            <li>
                <Link to="/app/home">Home</Link>
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
