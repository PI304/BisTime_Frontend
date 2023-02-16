import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <div className="w-full h-screen px-5 pt-15">{children}</div>;
}
