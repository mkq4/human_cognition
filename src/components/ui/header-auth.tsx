'use client';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
interface Props {
    className?: string;
}

export const HeaderAuth = ({ className }: Props) => {
    const {user} = useAuth()
  return (
    <div className={`${className} text-xl`}>
        {user 
        ? <Link href="/profile">Profile</Link>
        : <Link href="/auth">Login</Link>
        }   
    </div>
  );
};