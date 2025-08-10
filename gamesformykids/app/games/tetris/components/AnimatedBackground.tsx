const AnimatedBackground: React.FC = () => (
  <div className="absolute inset-0 opacity-10 pointer-events-none">
    <div className="absolute top-10 left-10 w-24 h-24 sm:w-32 sm:h-32 bg-yellow-400 rounded-full blur-xl animate-pulse"></div>
    <div className="absolute top-40 right-20 w-16 h-16 sm:w-24 sm:h-24 bg-pink-400 rounded-full blur-xl animate-pulse"></div>
    <div className="absolute bottom-20 left-20 w-28 h-28 sm:w-40 sm:h-40 bg-green-400 rounded-full blur-xl animate-pulse"></div>
    <div className="absolute bottom-40 right-10 w-20 h-20 sm:w-28 sm:h-28 bg-blue-400 rounded-full blur-xl animate-pulse"></div>
  </div>
);

export default AnimatedBackground;
