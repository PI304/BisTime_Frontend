export default function DashBoard() {
  return (
    <div className="mt-4">
      <div className="text-12">2023년 1월 14일 (토)</div>
      <div className="grid grid-cols-6 grid-rows-1">
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <div key={index}>
            <p
              className={`${
                index !== 0 && '-translate-x-1.5'
              } text-left font-light text-10 mt-2 relative`}
            >
              18
              {index === 5 && (
                <span className="absolute -right-1.5 font-light text-10">
                  18
                </span>
              )}
            </p>
            <div
              className={`w-full aspect-square mt-1 bg-primary-green-1 bg-opa bg-opacity-10`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
