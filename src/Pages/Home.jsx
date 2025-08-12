import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
function Home() {
  const quotes = [
    "Sweat is just fat crying.",
    "Push harder than yesterday if you want a different tomorrow.",
    "Strong mind. Strong body.",
    "Train insane or remain the same.",
    "Success starts with self-discipline.",
    "No excuses. Just results.",
    "You don't have to be extreme. Just consistent."
  ];

  const [quote, setQuote] = useState(quotes[0]);
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible(false); 

      setTimeout(() => {
        const nextIndex = (index + 1) % quotes.length;
        setIndex(nextIndex);
        setQuote(quotes[nextIndex]);
        setIsVisible(true); 
      }, 500); 
    }, 5000); 

    return () => clearInterval(intervalId);
  }, [index, quotes]);

  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1500&q=80')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100vw',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    ><div className="animated-bg" />
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: '#fff',
          padding: '0 2rem',
        }}
      >
        <h1 className="name"
          style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            textShadow: '0 0 15px #00bfff',
          }}
        >
          Welcome to FlexUp
        </h1>
         <span className="neon-underline"><p
  className={isVisible ? 'quote-text show' : 'quote-text'}
  style={{
    fontSize: '1.5rem',
    maxWidth: '600px',
    marginBottom: '2rem',
    fontStyle: 'italic',
    color: '#e0e0e0',
    transition: 'opacity 0.5s ease-in-out',
    backdropFilter:''
  }}
>
  {quote}
</p></span>

        <Link to="/dashboard">
          <button
            style={{
              padding: '0.75rem 2rem',
              fontSize: '1.2rem',
              backgroundColor: '#00bfff',
              border: 'none',
              borderRadius: '8px',
              color: '#000',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 0 10px #00bfff',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.target.style.boxShadow = '0 0 20px #00ffff';
              e.target.style.backgroundColor = '#00ffff';
            }}
            onMouseOut={(e) => {
              e.target.style.boxShadow = '0 0 10px #00bfff';
              e.target.style.backgroundColor = '#00bfff';
            }}
          >
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
