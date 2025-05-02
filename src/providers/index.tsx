import { AuthProvider } from "@/contexts/auth.context";
import { ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

//all providers
export const Providers = ({ className, children }: Props) => {
  return (
    <>
      <AuthProvider>{children}</AuthProvider>
    </>
  );
};
