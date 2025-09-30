import { StaticHeader } from "./StaticHeader";
import dynamic from "next/dynamic";

// Import ClientOnlyDynamicCallToAction with no SSR to prevent hydration mismatch
const DynamicCallToAction = dynamic(
  () => import("../marketing/ClientOnlyDynamicCallToAction").then(mod => ({ default: mod.ClientOnlyDynamicCallToAction })),
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
