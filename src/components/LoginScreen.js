import React,{useState} from 'react'
import SignupScreen from './SignupScreen'
import "./styles/LoginScreen.css"

function LoginScreen() {
  const [signIn, setSignIn] = useState(false)
  return (
    <div className='loginScreen'>
      <div className="loginScreen__background">
        <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" 
          alt=""
          className='loginScreen_logo' 
        />

        <button className='loginScreen__button' onClick={() => setSignIn(true)}>
          Sign In
        </button>
        <div className='loginScreen__gradient' />
      </div>
      <div className="loginScreen__body">
        {signIn ? (
          <SignupScreen/>
        ) : (
          <>
            <h1>Unlimited films, TV programs and more.</h1>
            <h2>Watch anywhere, Cancel at any time.</h2>
            <h3>Ready to watch? Enter your email to create or restart your membership.</h3>

            <div className="loginScreen__input">
              <form action="">
                <input type="email" placeholder='Email Adress' />
                <button className='loginScreen__getStarted' onClick={() => setSignIn(true)}>GET STARTED</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>

  )
}

export default LoginScreen