import React, { useState, useEffect } from 'react'
import "./styles/Nav.css"
import { useNavigate, Link } from 'react-router-dom'

function Nav() {
  //navbar black effect by scrolling
  const [show, handleShow] = useState(false)

  //const navigate = useNavigate()

  const transitionNavBar = () => {
    if(window.scrollY > 100){
      handleShow(true)
    }else{
      handleShow(false)
    }
  }
  
  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return() => window.removeEventListener("scroll", transitionNavBar)
  }, [])
  
  return (
    <div className={`nav ${show && 'nav__black'}`}>
        <div className='nav__contents'>
            <Link to={"/"}>
              <img className='nav__logo' src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="" />
            </Link>
            <Link to="/profile">
              <img  className='nav__avatar' src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="" />
            </Link>
        </div>
    </div>
  )
}

export default Nav