import { ReactNode } from "react";

interface Props {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  type?: "primary" | "secondary" | "submit";
}

export const Button = ({ className, children, onClick, type = "primary" }: Props) => {
  const buttonStyles = {
    primary: `text-xl bg-fuchsia-200 p-2 rounded-md cursor-pointer hover:bg-fuchsia-300`,
    secondary: `text-xl bg-blue-200 p-2 rounded-md cursor-pointer hover:bg-blue-300`,
    submit: `text-xl bg-green-200 p-2 rounded-md cursor-pointer hover:bg-green-300`,
  };
  return <button onClick={onClick} className={`${className} ${buttonStyles[type]}`}>{children}</button>;
};
