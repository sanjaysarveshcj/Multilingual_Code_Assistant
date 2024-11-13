import React, { useState, useRef, useEffect } from 'react';
import '../styles/chat.css';

const CodeAnalyze = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatWindowRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      // Add user message to chat
      setMessages((prev) => [...prev, { text: input, sender: 'user' }]);
      setInput(''); // Clear input field

      try {
        const response = await fetch('http://127.0.0.1:5000/analyze-code', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code: input }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Network response was not ok');
        }

        const data = await response.json();
        // Display response from the bot, ensure to handle data correctly
        setMessages((prev) => [
          ...prev,
          { text: data.suggestions || data.error || "No suggestions available.", sender: 'bot' },
        ]);
      } catch (error) {
        console.error("Error:", error);
        setMessages((prev) => [
          ...prev,
          { text: `Error analyzing the code: ${error.message}`, sender: 'bot' },
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
            <p>Chat with Code Assistant</p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message here..."
        />
        <button onClick={handleSend}>
          <i className="fas fa-paper-plane"></i> {/* Font Awesome Paper Plane icon */}
        </button>
      </div>
    </div>
  );
};

export default CodeAnalyze;
