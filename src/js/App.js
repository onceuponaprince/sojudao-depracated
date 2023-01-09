import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import '../styles/App.scss'

export default function App() {
  return (
    <div className='App' id='root'>
      <Hero />
    </div>
  )
}

const Hero = () => {
  return (
    <header>
      <a href='#'>
        <h1>Welcome to SojuDAO</h1>
      </a>
      <div>
        <div>
          Learn. <br/>
          Connect. <br/>
          Play.
        </div>
      </div>
    </header>
  )
}



const Footer = () => {
  return (
    <footer>
      <small>Copyright 2022</small>
      <ul className='social-links'>
        <li>
          <a href='#'>
            <img src={twitter} alt='sns logos go here' width={16} />
          </a>
        </li>
        <li>
          <a href='#'>
            <img src={telegram} alt='sns logos go here' width={16} />
          </a>
        </li>
      </ul>
      <small>
        <a href='#'>We're Raising!</a>
      </small>
    </footer>
  )
}
