import React from 'react';
import { NavLink } from 'react-router-dom';
import './HeaderMain.css';

export default function HeaderMain() {
  return (
    <header id='header'>
      <nav id='header_nav'>
        <ul id='nav_ul'>
          <li className='ul_li'><NavLink className='li_a' to={"/"}>Home</NavLink></li>
          <li className='ul_li'><NavLink className='li_a' to={"superheros"}>Superheros</NavLink></li>
          <li className='ul_li'><NavLink className='li_a' to={"powers"}>Powers</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}
