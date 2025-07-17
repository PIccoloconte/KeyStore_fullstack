import { Button } from "@/components/ui/button";
import { CreditCard, Copy } from "lucide-react";
import React from "react";

const purchaseCodes = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-8 max-w-md mx-auto text-center">
      {/* DLC Title */}
      <div className="mb-2">
        <span className="text-orange-500 text-sm font-medium">DLC</span>
        <h2 className="text-white text-lg font-medium mt-1">COD</h2>
      </div>

      {/* Subtitle */}
      <p className="text-gray-400 text-sm mb-6">
        is now ready for activation in your Microsoft Store account
      </p>

      {/* Xbox Logo */}
      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-green-500 font-bold text-lg">X</span>
          </div>
        </div>
      </div>

      {/* Activation Code */}
      <div className="bg-gray-900 rounded-lg p-4 mb-6">
        <code className="text-white text-lg font-mono tracking-wider">
          13213-dsadw-45543-ffdsd
        </code>
      </div>

      {/* Redeem Button */}
      <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-md mb-6 w-full">
        <Copy />
        Copy key
      </Button>

      {/* Help Text */}
      <p className="text-gray-500 text-xs mb-4">
        Struggling with how to activate the code? View the activation tutorial
        or contact us
      </p>

      {/* Credit Card Icon */}
      <div className="flex justify-center items-center gap-2">
        <CreditCard className="w-5 h-5 text-orange-500" />
        <p>Print as a gift card</p>
      </div>
    </div>
  );
};

export default purchaseCodes;
