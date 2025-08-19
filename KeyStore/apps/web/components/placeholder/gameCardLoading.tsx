import React from "react";

const GameCardLoading = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <div className="w-36 h-8 bg-gray-700 animate-pulse rounded-lg"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="w-full max-w-[395px] h-[302px] bg-gray-700 animate-pulse rounded-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default GameCardLoading;
