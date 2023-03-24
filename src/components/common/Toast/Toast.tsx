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
    <div className="absolute inset-0 w-52 h-20 z-50 m-auto animate-toast flex justify-center items-center rounded-xl bg-[#F5F5F5] p-5 opacity-95">
      <p className="text-12">{text}</p>
    </div>
  );
}
