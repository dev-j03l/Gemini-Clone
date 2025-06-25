import { React, useState, useEffect, useRef } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';

const Main = () => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  const handleSendPrompt = async (customPrompt) => {
    const inputPrompt = customPrompt || prompt;
    if (!inputPrompt.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', text: inputPrompt }]);
    setPrompt('');

    try {
      const res = await fetch('http://localhost:5000/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: inputPrompt }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'model', text: data.text || 'No response.' }]);
    } catch (error) {
      console.error('API Error:', error);
      setMessages((prev) => [...prev, { role: 'model', text: 'Something went wrong.' }]);
    }
  };

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

        {messages.length === 0 ? (
          <div className="cards">
            <div className="card" onClick={() => handleSendPrompt('Suggest beautiful places to see on an upcoming road trip')}>
              <p>Suggest beautiful places to see on an upcoming road trip</p>
              <img src={assets.compass_icon} alt="" />
            </div>
            <div className="card" onClick={() => handleSendPrompt('Briefly summarize this concept: urban planning')}>
              <p>Briefly summarize this concept: urban planning</p>
              <img src={assets.bulb_icon} alt="" />
            </div>
            <div className="card" onClick={() => handleSendPrompt('Brainstorm team bonding activities for a work retreat')}>
              <p>Brainstorm team bonding activities for a work retreat</p>
              <img src={assets.message_icon} alt="" />
            </div>
            <div className="card" onClick={() => handleSendPrompt('Improve the readability of the following code')}>
              <p>Improve the readability of the following code</p>
              <img src={assets.code_icon} alt="" />
            </div>
          </div>
        ) : (
          <div className="chat-window">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.role}`}>
                <img src={msg.role === 'user' ? assets.user_icon : assets.bot_icon} alt={msg.role} />
                <p>{msg.text}</p>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter a prompt here"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt()}
            />
            <div onClick={() => handleSendPrompt()} style={{ cursor: 'pointer' }}>
              <img src={assets.gallery_icon} alt="Insert Image" />
              <img src={assets.mic_icon} alt="Use Microphone" />
              <img src={assets.send_icon} alt="Send Prompt" />
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people. Double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
