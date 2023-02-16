interface ProgressBarProps {
  progress: string;
  className?: string;
}

export default function ProgressBar({ progress, className }: ProgressBarProps) {
  return (
    <div
      className={`w-full h-0.5 flex flex-row items-center bg-gray-3 rounded-full justify-start ${className}`}
    >
      <div
        className={`w-${progress} h-0.5 bg-primary-green-1 rounded-full`}
      ></div>
    </div>
  );
}
