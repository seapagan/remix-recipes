import classNames from "classnames";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={classNames(
        "flex px-3 py-2 rounded-md justify-center",
        className
      )}
    >
      {children}
    </button>
  );
};

export const PrimaryButton = ({ className, ...props }: ButtonProps) => {
  return (
    <Button
      {...props}
      className={classNames(
        "text-white bg-primary hover:bg-primary-light",
        className
      )}
    />
  );
};

