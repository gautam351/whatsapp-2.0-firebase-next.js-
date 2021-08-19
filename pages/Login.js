import React from 'react'
import { auth, provider } from '../firebase'



function Login() {
    const signin=()=>{
        auth.signInWithPopup(provider).catch(alert);
    }
    return (
        <div className="logincontainer">
            
    {/* <img src="https://www.google.com/logos/doodles/2020/stay-and-play-at-home-with-popular-past-google-doodles-cricket-2017-6753651837108767-2xa.gif"  className="logo" alt="google" /> */}
        <a onClick={signin}>login with Google</a>      
    
     </div>
    )
}

export default Login
