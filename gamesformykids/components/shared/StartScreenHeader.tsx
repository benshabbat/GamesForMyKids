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
