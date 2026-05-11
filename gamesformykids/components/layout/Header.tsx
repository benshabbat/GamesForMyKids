import { StaticHeader } from "./StaticHeader";
import dynamic from "next/dynamic";

const DynamicCallToAction = dynamic(
  () => import("../marketing/DynamicCallToActionContent"),
  { ssr: false, loading: () => null }
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
