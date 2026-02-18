const MedicalLogo = ({ size = "w-24 h-24" }) => {
  return (
    <div className={`${size} relative`} style={{ perspective: '1000px' }}>
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
        {/* Main clipboard background */}
        <defs>
          <linearGradient id="clipboardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          <linearGradient id="crossGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="scopeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCA5A5" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>
        </defs>
        
        {/* Shadow */}
        <ellipse cx="100" cy="185" rx="70" ry="10" fill="black" opacity="0.1"/>
        
        {/* Clipboard base - 3D effect */}
        <rect x="40" y="40" width="120" height="140" rx="15" fill="url(#clipboardGrad)" />
        <rect x="45" y="45" width="110" height="130" rx="12" fill="#E0F2FE" opacity="0.5"/>
        
        {/* Clipboard clip */}
        <rect x="75" y="30" width="50" height="15" rx="7" fill="#94A3B8"/>
        <rect x="80" y="32" width="40" height="11" rx="5" fill="#CBD5E1"/>
        
        {/* Medical cross - left side */}
        <g transform="translate(55, 80)">
          <rect x="10" y="0" width="20" height="50" rx="4" fill="url(#crossGrad)"/>
          <rect x="0" y="15" width="40" height="20" rx="4" fill="url(#crossGrad)"/>
          {/* Shine effect */}
          <rect x="12" y="2" width="8" height="20" rx="2" fill="white" opacity="0.3"/>
        </g>
        
        {/* Stethoscope - right side */}
        <g transform="translate(110, 70)">
          {/* Stethoscope tube */}
          <path d="M 20 10 Q 25 15, 25 25 L 25 50" 
                stroke="#3B82F6" 
                strokeWidth="6" 
                fill="none" 
                strokeLinecap="round"/>
          <path d="M 30 10 Q 35 15, 35 25 L 35 50" 
                stroke="#3B82F6" 
                strokeWidth="6" 
                fill="none" 
                strokeLinecap="round"/>
          
          {/* Ear pieces */}
          <circle cx="20" cy="8" r="6" fill="url(#scopeGrad)"/>
          <circle cx="30" cy="8" r="6" fill="url(#scopeGrad)"/>
          <circle cx="20" cy="8" r="3" fill="white" opacity="0.6"/>
          <circle cx="30" cy="8" r="3" fill="white" opacity="0.6"/>
          
          {/* Chest piece */}
          <circle cx="30" cy="55" r="15" fill="#F59E0B"/>
          <circle cx="30" cy="55" r="12" fill="url(#scopeGrad)"/>
          <circle cx="30" cy="55" r="8" fill="white" opacity="0.3"/>
          <circle cx="32" cy="53" r="3" fill="white" opacity="0.5"/>
        </g>
        
        {/* Decorative elements */}
        <circle cx="60" cy="150" r="3" fill="#3B82F6" opacity="0.3"/>
        <circle cx="140" cy="160" r="3" fill="#F59E0B" opacity="0.3"/>
        <circle cx="70" cy="165" r="2" fill="#EF4444" opacity="0.3"/>
      </svg>
    </div>
  );
};

export default MedicalLogo;
