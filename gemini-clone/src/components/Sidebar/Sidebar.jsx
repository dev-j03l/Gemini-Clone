import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="top">
            <img className="menu" src ={assets.menu_icon} alt = "Menu" />
            <div className="new-chat">
                <img src={assets.plus_icon} alt="New Chat" />
                <p>New Chat</p>
            </div>
            <div className="recent">
                <p className="recent-title">Recent</p>
                <div className="recent-entry">
                    <img src={assets.message_icon} alt="Recent Entry" />
                    <p>What is react ...</p>
                </div>
            </div>
        </div>

        <div className="bottom">
            <div className="bottom-item recent-entry">
                <img src={assets.question_icon} alt="Help" />
                <p>Help</p>
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.history_icon} alt="History" />
                <p>Activity</p>
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.setting_icon} alt="Settings" />
                <p>Settings</p>
            </div>
        </div>
    </div>
  )
}

export default Sidebar