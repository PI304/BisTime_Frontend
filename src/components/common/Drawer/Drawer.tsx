import { useState } from 'react';

interface DrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Drawer({ children, isOpen, onClose }: DrawerProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  return (
    <>
      {/* Drawer가 열린 상태면 투명한 배경을 렌더링합니다. */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-25 z-40"
          onClick={onClose}
        ></div>
      )}
      <div
        className={`${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        } transform bg-white fixed bottom-0 right-0 z-50 w-full rounded-t-2xl p-4 overflow-auto ease-in-out transition-all duration-300`}
        onTransitionEnd={handleTransitionEnd}
      >
        {/* Drawer가 열린 상태면 컨텐츠를 렌더링합니다. */}
        {isOpen && <div className="h-full">{children}</div>}
      </div>
    </>
  );
}
