import React from "react";

const CartSummaryLoading = () => {
  return (
    <div>
      <div className="mb-6">
        <div className="mb-4 flex justify-between">
          <span className="h-6 w-12 animate-pulse bg-gray-700"></span>
          <span className="h-6 w-12 animate-pulse bg-gray-700"></span>
        </div>
        <div className="border-t pt-4 flex justify-between border-gray-700">
          <span className="h-7 w-12 animate-pulse bg-gray-700"></span>
          <span className="h-7 w-12 animate-pulse bg-gray-700"></span>
        </div>
      </div>
      <div className="mb-4 h-9 w-full animate-pulse bg-gray-700 rounded-lg"></div>
      <div className="m-auto bg-gray-700 w-4 h-5 animate-pulse mb-4"></div>
      <div className=" h-9 w-full animate-pulse bg-gray-700 rounded-lg"></div>
    </div>
  );
};

export default CartSummaryLoading;
