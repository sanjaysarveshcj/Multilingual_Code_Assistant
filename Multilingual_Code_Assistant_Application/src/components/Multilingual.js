import React, { useState, useRef, useEffect } from 'react';
import '../styles/chat.css';

const Multilingual = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sourceLang, setSourceLang] = useState('en'); // Default source language (English)
  const [targetLang, setTargetLang] = useState('de'); // Default target language (German)
  const chatWindowRef = useRef(null);

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle sending the message for translation
  const handleSend = async () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { text: input, sender: 'user' }]);
      setInput('');

      try {
        const response = await fetch('http://127.0.0.1:5000/translate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: input,
            source_lang: sourceLang,
            target_lang: targetLang,
          }), // Send source and target languages
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Network response was not ok');
        }

        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          { text: data.translatedText || "Translation error", sender: 'bot' },
        ]);
      } catch (error) {
        console.error("Error:", error);
        setMessages((prev) => [
          ...prev,
          { text: `Error: ${error.message}`, sender: 'bot' },
        ]);
      }
    }
  };

  return (
    <div className="chatbot">
      <div className="chat-window" ref={chatWindowRef}>
        {messages.length === 0 && (
          <div className={`placeholder-text ${messages.length > 0 ? 'placeholder-hidden' : ''}`}>
            <div className="navbar-logo">
              <img src="logo.png" alt="Logo" />
            </div>
            <p>Chat with Multilingual</p>
          </div>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`} >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="input-area">
        <div className="language-selection">
          <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
            <option value="en">English</option>
            <option value="de">German</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            <option value="it">Italian</option>
            <option value="pt">Portuguese</option>
            <option value="zh">Chinese</option>
            <option value="nl">Dutch</option>
            <option value="ru">Russian</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            <option value="ar">Arabic</option>
            <option value="hi">Hindi</option>
            <option value="bn">Bengali</option>
            <option value="tr">Turkish</option>
            <option value="fa">Persian</option>
            <option value="pl">Polish</option>
            <option value="ro">Romanian</option>
            <option value="fi">Finnish</option>
            <option value="sv">Swedish</option>
            <option value="no">Norwegian</option>
            <option value="da">Danish</option>
            <option value="el">Greek</option>
            <option value="he">Hebrew</option>
            <option value="cs">Czech</option>
            <option value="hu">Hungarian</option>
            <option value="ms">Malay</option>
            <option value="th">Thai</option>
            <option value="vi">Vietnamese</option>
            <option value="id">Indonesian</option>
            <option value="ta">Tamil</option>




            {/* Add more source languages as needed */}
          </select>

          <span style={{ margin: '10px 10px' }}>to</span>

          <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)} style={{ marginRight: '10px' }}>
            <option value="en">English</option>
            <option value="de">German</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            <option value="it">Italian</option>
            <option value="pt">Portuguese</option>
            <option value="zh">Chinese</option>
            <option value="nl">Dutch</option>
            <option value="ru">Russian</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            <option value="ar">Arabic</option>
            <option value="hi">Hindi</option>
            <option value="bn">Bengali</option>
            <option value="tr">Turkish</option>
            <option value="fa">Persian</option>
            <option value="pl">Polish</option>
            <option value="ro">Romanian</option>
            <option value="fi">Finnish</option>
            <option value="sv">Swedish</option>
            <option value="no">Norwegian</option>
            <option value="da">Danish</option>
            <option value="el">Greek</option>
            <option value="he">Hebrew</option>
            <option value="cs">Czech</option>
            <option value="hu">Hungarian</option>
            <option value="ms">Malay</option>
            <option value="th">Thai</option>
            <option value="vi">Vietnamese</option>
            <option value="id">Indonesian</option>
            <option value="ta">Tamil</option>


            {/* Add more target languages as needed */}
          </select>
        </div>

        {/* Input field for text */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type text to translate..."
        />

        {/* Send button */}
        <button onClick={handleSend}>
          <i className="fas fa-paper-plane"></i> {/* Font Awesome Paper Plane icon */}
        </button>
      </div>
    </div>
  );
};

export default Multilingual;
