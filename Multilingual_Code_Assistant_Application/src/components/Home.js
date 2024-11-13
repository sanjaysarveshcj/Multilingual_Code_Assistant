// src/components/Home.js
import React from 'react';
import '../styles/home.css';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Welcome to the Multilingual Code Assistant</h1>
        <p>
          Experience the power of AI-driven code analysis and real-time translation in one platform. Whether you are
          working on a coding project or translating technical documents, we’ve got you covered.
        </p>
        <a href="/multilingual" className="cta-button">Get Started</a>
      </section>

      <section className="features">
        <h2>Key Features</h2>
        <div className="feature-list">
          <div className="feature-item">
            <h3>Multilingual Translation</h3>
            <p>Translate text into multiple languages with high accuracy using XLM-RoBERTa.</p>
          </div>
          <div className="feature-item">
            <h3>Code Analysis</h3>
            <p>Analyze and debug code instantly using advanced LLM-based CodeGen models.</p>
          </div>
          <div className="feature-item">
            <h3>Combined Functionality</h3>
            <p>Seamlessly switch between code analysis and text translation to enhance productivity.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol className="steps">
          <li><strong>Step 1:</strong> Input your code or text.</li>
          <li><strong>Step 2:</strong> Choose either "Code Analysis" or "Multilingual Translation".</li>
          <li><strong>Step 3:</strong> Receive suggestions or translations in seconds!</li>
          <li><strong>Step 4:</strong> Improve your project with the insights provided.</li>
        </ol>
      </section>

      <section className="about">
        <h2>About the Multilingual Code Assistant</h2>
        <p>
          This platform leverages the power of advanced machine learning models to analyze code and translate text in real
          time. It’s designed for developers, students, and professionals looking to streamline their workflow, improve
          code quality, and break language barriers. Our goal is to provide a simple yet powerful tool that enhances your
          coding and translation experience.
        </p>
      </section>
    </div>
  );
};

export default Home;
