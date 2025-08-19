import { ReactNode } from "react";
import { ComponentTypes } from "@/lib/types";

type StartScreenHeaderProps = ComponentTypes.StartScreenHeaderProps & {
  subTitle: string; // Required in this component
  textColorHeader?: string;
  textColorSubHeader?: string;
  className?: string;
  children?: ReactNode;
};

/**
 * StartScreenHeader - כותרת פשוטה למסכי התחלה
 * ללא תלות בקונטקסט
 */
export default function StartScreenHeader({
  title,
  subTitle,
  textColorHeader = "text-purple-800",
  textColorSubHeader = "text-purple-600",
  className = "",
  children,
}: StartScreenHeaderProps) {
  return (
    <div className={`text-center mb-8 ${className}`}>
      <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${textColorHeader}`}>
        {title}
      </h1>
      <p className={`text-xl md:text-2xl font-medium ${textColorSubHeader}`}>
        {subTitle}
      </p>
      {children}
    </div>
  );
}
