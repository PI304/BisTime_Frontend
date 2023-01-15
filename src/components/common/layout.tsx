import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="font-Gmarket w-full h-screen px-5 py-[60px]">
      {children}
    </div>
  );
}
