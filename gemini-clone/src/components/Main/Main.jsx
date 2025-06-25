import React from 'react'
import './Main.css'
import { assets } from '../../assets/assets'

const Main = () => {
  return (
    <div className="main">
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="user-profile-image" />
        </div>
        <div className="main-container">
            <div className="greet">
                <p><span>Hello, welcome to Gemini.</span></p>
                <p>How can I help you today?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest beautiful places to see on an upcoming road trip</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Briefly summarize this concept: urban planning</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Brainstorm team bonding activities for a work retreat</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Improve the readability of the following code</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>

            <div className="main-bottom">
                <div className="search-box">
                    <input type="text" placeholder='Enter a prompt here' />
                    <div>
                        <img src={assets.gallery_icon} alt="Insert Image" />
                        <img src={assets.mic_icon} alt="Use Microphone" />
                        <img src={assets.send_icon} alt="Send Prompt" />
                    </div>
                </div>
                <p className="bottom-info">
                    Gemini may display innacurate info, including about people, so double-check its responses. Your privacy and apps.
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main