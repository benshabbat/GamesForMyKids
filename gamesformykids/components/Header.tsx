import { StaticHeader } from "./StaticHeader";
import { DynamicCallToAction } from "./DynamicCallToAction";

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
