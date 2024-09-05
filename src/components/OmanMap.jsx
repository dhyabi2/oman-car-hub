import React from 'react';

const OmanMap = ({ onSelectLocation }) => {
  const handleClick = (e) => {
    const cityName = e.target.getAttribute('data-name');
    if (cityName) {
      onSelectLocation(cityName);
    }
  };

  return (
    <svg width="300" height="400" viewBox="0 0 300 400" onClick={handleClick}>
      <path
        d="M150 50 L100 150 L200 150 Z"
        fill="#f0f0f0"
        stroke="#000"
        strokeWidth="2"
        data-name="Muscat"
      />
      <text x="150" y="120" textAnchor="middle" fontSize="12">Muscat</text>
      
      <circle
        cx="80"
        cy="250"
        r="30"
        fill="#f0f0f0"
        stroke="#000"
        strokeWidth="2"
        data-name="Salalah"
      />
      <text x="80" y="255" textAnchor="middle" fontSize="12">Salalah</text>
      
      <rect
        x="200"
        y="200"
        width="60"
        height="40"
        fill="#f0f0f0"
        stroke="#000"
        strokeWidth="2"
        data-name="Sohar"
      />
      <text x="230" y="225" textAnchor="middle" fontSize="12">Sohar</text>
      
      <ellipse
        cx="150"
        cy="350"
        rx="40"
        ry="30"
        fill="#f0f0f0"
        stroke="#000"
        strokeWidth="2"
        data-name="Nizwa"
      />
      <text x="150" y="355" textAnchor="middle" fontSize="12">Nizwa</text>
    </svg>
  );
};

export default OmanMap;