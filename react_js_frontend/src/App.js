// App.js
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import './App.css';
import logo from './logo.svg';
import { getFirebaseConfig } from "./firebase";
import { searchPixabayImages } from "./pixabay";

/**
 * The main App component for Food Truck Frenzy.
 * - Checks required env config (Pixabay API, Firebase)
 * - Provides whimsical onboarding and playful vibrant style for initial login
 * - Scaffolds game client entrypoint
 */

// Animations & Style
const RainbowBG = styled.div`
  background: linear-gradient(120deg, #f391a0 20%, #ffe175 100%);
  min-height: 100vh;
  display: flex; flex-direction:column; align-items: center; justify-content: center;
  padding: 0;
`;

const Jiggle = keyframes`
  0% { transform: rotate(-3deg) scale(1.05);}
  50% { transform: rotate(4deg) scale(1.03);}
  100% { transform: rotate(-3deg) scale(1);}
`;

const CartoonLogo = styled.img`
  width: 180px;
  height: 180px;
  filter: drop-shadow(0 4px 15px #f391a055);
  animation: ${Jiggle} 2.4s infinite cubic-bezier(.46,.73,.69,1.3);
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-family: 'Comic Sans MS', 'Comic Neue', cursive;
  color: #f391a0;
  font-size: 2.8rem; letter-spacing: 2px; margin-bottom: 0.2em;
  text-shadow: 3px 3px 0 #fff8e1, 0 6px 8px #e6c1c144;
`;
const Subtitle = styled.h2`
  font-family: 'Comic Sans MS', 'Comic Neue', cursive;
  color: #10100f;
  background: #ffe175bb; 
  display:inline-block; padding: 6px 24px;
  border-radius: 16px; 
  font-size: 1.2rem;
  margin-bottom: 1.5em;
  box-shadow: 1px 4px 20px #eedc82aa;
`;

const Card = styled.div`
  background: #fffafc;
  border-radius: 30px 20px 50px 40px;
  padding: 2.4em 2em;
  box-shadow: 0 8px 48px 0 #f391a045, 0 2px 4px #f391a0;
  width: 350px;
  margin: 16px auto 20px auto;
  display: flex; flex-direction:column; align-items: center;
`;

const VibrantButton = styled.button`
  font-family: inherit;
  border: none; outline: none;
  border-radius: 18px;
  background: #f391a0;
  color: #fff; font-size: 1.25rem; font-weight: bold;
  margin-top: 16px;
  box-shadow: 1px 3px 16px #f391a055, 0 1px 10px #ffe17555;
  padding: 0.7em 2em;
  cursor: pointer;
  transition: transform .10s cubic-bezier(.6,1.4, .3,1.2);
  &:hover { background:#ff60c6; transform:scale(1.08);}
`;

const FadeText = styled.div`
  opacity:0.8; color: #a06368; margin-bottom:1em; font-size:1.02em;
`;

const ErrorText = styled.div`
  color: #e12d2d; font-weight: bold; margin-top: 1em;
`;

function App() {
  const [theme, setTheme] = useState('light');
  const [pixabayKeyPresent, setPixabayKeyPresent] = useState(true);
  const [firebaseConfigOk, setFirebaseConfigOk] = useState(true);
  const [testImageUrl, setTestImageUrl] = useState(null);
  const [error, setError] = useState("");

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme(prev => prev === "light" ? "dark" : "light");

  // Effect to sync theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Check required envs on load
  useEffect(() => {
    // Pixabay API key check
    if (!process.env.REACT_APP_PIXABAY_API_KEY) setPixabayKeyPresent(false);
    // Firebase config check (only require apiKey and projectId for now)
    const conf = getFirebaseConfig();
    if (!conf.apiKey || !conf.projectId) setFirebaseConfigOk(false);
  }, []);

  // Demo fetch from Pixabay when config is ok
  useEffect(() => {
    async function tryFetchDemoImage() {
      if (pixabayKeyPresent && firebaseConfigOk) {
        try {
          const res = await searchPixabayImages("food truck", { per_page: 1 });
          if (res.hits && res.hits.length > 0) setTestImageUrl(res.hits[0].webformatURL);
        } catch(e) {
          setError("Pixabay API error: " + e.message);
        }
      }
    }
    tryFetchDemoImage();
  }, [pixabayKeyPresent, firebaseConfigOk]);

  let issueMsg = "";
  if (!pixabayKeyPresent || !firebaseConfigOk) {
    issueMsg = (
      <FadeText>
        <b>Missing configuration:</b><br/>
        {!pixabayKeyPresent && <>No <code>REACT_APP_PIXABAY_API_KEY</code> found.<br/></>}
        {!firebaseConfigOk && <>Incomplete Firebase config.<br/></>}
        Please copy <code>.env.template</code> to <code>.env</code> and set the fields with your keys.
        <br/>
        <a target="_blank" rel="noopener noreferrer" href="https://pixabay.com/api/docs/">Get Pixabay API Key &raquo;</a>
        <br/>
        <a target="_blank" rel="noopener noreferrer" href="https://console.firebase.google.com/">Get Firebase Config &raquo;</a>
      </FadeText>
    );
  }

  return (
    <RainbowBG>
      <button 
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
      <Card style={{marginTop:'2em'}}>
        <CartoonLogo src={logo} alt="Food Truck Frenzy logo" />
        <Title>Food Truck Frenzy</Title>
        <Subtitle>
          Cook, dash, and serve with style!<br/>
          <span role="img" aria-label="Truck">🚚</span> <span role="img" aria-label="Cook">👩‍🍳</span> <span role="img" aria-label="Combo">🍔🍟🥤</span>
        </Subtitle>
        {issueMsg}
        {error && <ErrorText>{error}</ErrorText>}
        {testImageUrl && (
          <div>
            <FadeText>Pixabay Demo Image:</FadeText>
            <img 
              src={testImageUrl} 
              alt="demo" 
              style={{
                borderRadius:'24px',
                border:'5px solid #ffe17580',
                boxShadow:'0 1px 22px #f391a055'
              }}
              width="80%"
            />
          </div>
        )}
        <VibrantButton onClick={() => alert("Game Start coming soon!")}
          style={{marginTop:'2.5em'}}
        >Play Now</VibrantButton>
      </Card>
      <FadeText>
        <span style={{fontSize:"1.1em"}}>Animated, playful cartoon UI | React + Firebase + Pixabay powered</span>
      </FadeText>
    </RainbowBG>
  );
}

export default App;
