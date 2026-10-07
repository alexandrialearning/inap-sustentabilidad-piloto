export const Orb = ({ isSpeaking }: { isSpeaking: boolean }) => {
  return (
    <div className="flex justify-center items-center my-6">
      <div 
        className={`relative w-24 h-24 rounded-full transition-all duration-500 flex items-center justify-center
          ${isSpeaking ? 'scale-110' : 'scale-100 opacity-70'}
        `}
        style={{
          background: "radial-gradient(circle at 30% 30%, #a855f7, #581c87)",
          boxShadow: isSpeaking 
            ? "0 0 20px #a855f7, 0 0 40px #7e22ce, inset 0 0 20px rgba(255,255,255,0.5)" 
            : "0 0 10px rgba(168, 85, 247, 0.3), inset 0 0 10px rgba(255,255,255,0.2)"
        }}
      >
        <div className={`absolute inset-0 rounded-full border-2 border-purple-300 opacity-20 ${isSpeaking ? 'animate-ping' : ''}`}></div>
        
        {/* Core light */}
        <div className="w-8 h-8 bg-white rounded-full opacity-30 blur-sm"></div>
      </div>
    </div>
  );
};
