'use client';

import { Container } from '@/components/shared/container';
import { LoginForm } from "@/components/shared/login-form";
import { RegisterForm } from "@/components/shared/registration-form";

interface Props {
  className?: string;
  login: boolean;
}

const AuthPage = ({ className, login }: Props) => {
  return (
      <Container className={className}>
        <div className="flex items-center justify-center h-full">
          {login ? <LoginForm /> : <RegisterForm />}
        </div>
      </Container>
  );
};

export default AuthPage;
