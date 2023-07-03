import React from "react";

global {
  interface DefaultComponentProps {
    children?: React.ReactNode;
    className?: string | undefined;
    onClick?: (...args: any) => any;
    [key = string]?: any;
  }

  type DefaultComponent = React.FC<DefaultComponentProps>;

  // Why doesn't TypeScript allow me to declare global enums? 🤷‍♂️
  // This will be a type instead of an enum by now.
  type Breakpoints = "xs" | "sm" | "md" | "lg" | "xl";
}
