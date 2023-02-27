import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
  return (
    <div className={`w-full h-screen px-5 pt-15 ${className}`}>{children}</div>
  );
}
