interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
  return (
    <div className={`w-full min-h-screen px-5 pt-15 py-10 ${className}`}>
      {children}
    </div>
  );
}
