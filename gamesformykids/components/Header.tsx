import { StaticHeader } from "./StaticHeader";
import dynamic from "next/dynamic";

// Import DynamicCallToAction with no SSR to prevent hydration mismatch
const DynamicCallToAction = dynamic(
  () => import("./DynamicCallToAction").then(mod => ({ default: mod.DynamicCallToAction })),
  { 
    ssr: false,
    loading: () => (
      <div className="mt-6">
        <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold text-lg shadow-md hover:shadow-lg transition-shadow duration-200 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2">
          ✨ התחילו לשחק עכשיו! ✨
        </div>
      </div>
    )
  }
);

function Header() {
  return (
    <>
      <StaticHeader />
      <div className="text-center -mt-6">
        <DynamicCallToAction />
      </div>
    </>
  );
}

export default Header;
