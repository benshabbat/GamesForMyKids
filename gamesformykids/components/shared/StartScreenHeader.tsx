import { Home } from "lucide-react";
interface StartScreenHeaderProps {
  textColorHeader?: string;
  textColorSubHeader?: string;
  title?: string;
  subTitle?: string;
}

const StartScreenHeader = ({
  textColorHeader = "text-purple-800",
  textColorSubHeader = "text-purple-600",
  title = "🎨 משחק צבעים 🎨",
  subTitle = "למד צבעים דרך משחק!",
}: StartScreenHeaderProps) => {
  return (
    <div className="mb-8">
      <button
        onClick={() => (window.location.href = "/")}
        className="mb-4 px-6 py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-xl font-bold text-purple-600 hover:bg-purple-50"
      >
        <Home className="inline w-6 h-6 ml-2" />← חזרה לעמוד הראשי
      </button>
      <h1 className={`text-5xl md:text-7xl font-bold ${textColorHeader} mb-4`}>
        {title}
      </h1>
      <p
        className={`text-xl md:text-2xl ${textColorSubHeader} font-semibold mb-8`}
      >
        {subTitle}
      </p>
    </div>
  );
};

export default StartScreenHeader;
