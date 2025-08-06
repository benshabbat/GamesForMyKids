import UnifiedHeader from "./UnifiedHeader";

interface StartScreenHeaderProps {
  textColorHeader?: string;
  textColorSubHeader?: string;
  title?: string;
  subTitle?: string;
}

/**
 * @deprecated השתמש ב-UnifiedHeader עם variant="start-screen" במקום
 * קומפוננט זה נשמר לתאימות לאחור
 */
const StartScreenHeader = ({
  textColorHeader = "text-purple-800",
  textColorSubHeader = "text-purple-600",
  title = "🎨 משחק צבעים 🎨",
  subTitle = "למד צבעים דרך משחק!",
}: StartScreenHeaderProps) => {
  return (
    <UnifiedHeader
      variant="start-screen"
      title={title}
      subTitle={subTitle}
      textColorHeader={textColorHeader}
      textColorSubHeader={textColorSubHeader}
    />
  );
};

export default StartScreenHeader;
