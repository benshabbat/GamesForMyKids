import { HTMLAttributes } from "react"

function Card({ className = "", ref, ...props }: HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={`rounded-lg border bg-white text-gray-900 shadow-sm ${className}`}
      {...props}
    />
  )
}
Card.displayName = "Card"

function CardHeader({ className = "", ref, ...props }: HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  return <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
}
CardHeader.displayName = "CardHeader"

function CardTitle({ className = "", ref, ...props }: HTMLAttributes<HTMLHeadingElement> & { ref?: React.Ref<HTMLHeadingElement> }) {
  return (
    <h3
      ref={ref}
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  )
}
CardTitle.displayName = "CardTitle"

function CardDescription({ className = "", ref, ...props }: HTMLAttributes<HTMLParagraphElement> & { ref?: React.Ref<HTMLParagraphElement> }) {
  return <p ref={ref} className={`text-sm text-gray-600 ${className}`} {...props} />
}
CardDescription.displayName = "CardDescription"

function CardContent({ className = "", ref, ...props }: HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  return <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
}
CardContent.displayName = "CardContent"

function CardFooter({ className = "", ref, ...props }: HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  return <div ref={ref} className={`flex items-center p-6 pt-0 ${className}`} {...props} />
}
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
