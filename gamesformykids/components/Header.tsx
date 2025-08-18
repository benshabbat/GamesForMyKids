import { StaticHeader } from "./StaticHeader";
import dynamic from "next/dynamic";

// Import DynamicCallToAction with no SSR to prevent hydration mismatch
const DynamicCallToAction = dynamic(
  () => import("./DynamicCallToAction").then(mod => ({ default: mod.DynamicCallToAction })),
  { 
    ssr: false,
    loading: () => null // Don't show loading component to avoid mismatch
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
