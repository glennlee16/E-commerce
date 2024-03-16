import React from 'react'
import './NavBar.css'
import logo from '../Assets/logo.jpg'

export const NavBar = () => {
  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo}/>
            <p>SHOPPER</p>
        </div>
        <ul className='navmenu'>
          <li>Shop</li>
          <li>Men</li>
          <li>Women</li>
          <li>Kid</li>
        </ul>
    </div>
  )
}
