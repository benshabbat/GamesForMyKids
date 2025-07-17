/**
 * SoundIcon - A simple sound icon SVG component
 * 
 * This component can be used to display a sound icon in game cards
 */
export default function SoundIcon({ 
  className = "w-6 h-6 mx-auto",
  type = "volume" // "volume" or "eye"
}: { 
  className?: string;
  type?: "volume" | "eye";
}) {
  if (type === "eye") {
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
      >
        <path d="M2 10s3-3 10-3 10 3 10 3-3 3-10 3-10-3-10-3z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    );
  }

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
    </svg>
  );
}
