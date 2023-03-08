import React, { useEffect } from 'react';

interface ToastProps {
  setToast: (value: boolean) => void;
  text: string;
  [key: string]: any;
}
export default function Toast({ setToast, text }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);
  return (
    <div className="absolute right-5 bottom-8 z-50 m-auto flex justify-center animate-toast items-center rounded-md bg-[#F5F5F5] p-5 opacity-95">
      <p className="text-11">{text}</p>
    </div>
  );
}
