const HealthcareIllustration = () => {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center overflow-hidden">
      {/* Decorative Wave Shapes */}
      <div className="absolute inset-0 z-0">
        <svg viewBox="0 0 500 400" className="w-full h-full" preserveAspectRatio="none">
          <path 
            d="M 0 300 Q 125 250 250 300 T 500 300 L 500 400 L 0 400 Z" 
            fill="#BFDBFE" 
            opacity="0.3"
          />
          <path 
            d="M 0 320 Q 125 280 250 320 T 500 320 L 500 400 L 0 400 Z" 
            fill="#93C5FD" 
            opacity="0.2"
          />
        </svg>
      </div>

      {/* Healthcare Illustration Image */}
      <div className="relative z-20 w-full h-full flex items-center justify-center p-8">
        <img 
          src="/images/health tracker 1.png" 
          alt="Healthcare professional assisting patient at medical reception desk"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default HealthcareIllustration;
