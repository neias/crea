import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type Variant = "primary" | "secondary";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: Variant;
}
type ButtonRef = React.ComponentPropsWithRef<"button">["ref"];

const Button = forwardRef(
  ({ variant, children, ...props }: ButtonProps, ref: ButtonRef) => {
    // General Styles
    const generalStyles = [
      "transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer", // Default
      "focus:ring-4 focus:ring-primary focus:ring-opacity-20", // On focus
      "focus-visible:outline-none", // On focus visible
      "dark:focus:ring-slate-700 dark:focus:ring-opacity-50", // Dark mode
      "[&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90", // On hover and not disabled
      "[&:not(button)]:text-center", // Not a button element
      "disabled:opacity-70 disabled:cursor-not-allowed", // Disabled
    ];

    const primary = [
      "bg-primary border-primary text-white dark:border-primary", // Default
    ];
    const secondary = [
      "bg-secondary/70 border-secondary/70 text-slate-500", // Default
      "dark:border-darkmode-400 dark:bg-darkmode-400 dark:text-slate-300", // Dark mode
      "[&:hover:not(:disabled)]:bg-slate-100 [&:hover:not(:disabled)]:border-slate-100", // On hover and not disabled
      "[&:hover:not(:disabled)]:dark:border-darkmode-300/80 [&:hover:not(:disabled)]:dark:bg-darkmode-300/80", // On hover and not disabled in dark mode
    ];

    return (
      <button
        {...props}
        ref={ref}
        className={twMerge([
          generalStyles,
          variant == "primary" && primary,
          variant == "secondary" && secondary,
          props.className,
        ])}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
