import { Cloud, Shield, MessageCircle, Star } from "lucide-react";

export default function SecurityBanner() {
  return (
    <div className="bg-[#101010] text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-5">
        <div className="flex items-center flex-col lg:flex-row  gap-5">
          {/* Super fast */}
          <div className="flex items-center space-x-3">
            <Cloud className="w-6 h-6 text-orange-500" />
            <div>
              <h3 className="font-semibold text-white">Super fast</h3>
              <p className="text-sm text-gray-400">Instant digital download</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-12 w-px bg-gray-700 hidden lg:block"></div>

          {/* Reliable & safe */}
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-orange-500" />
            <div>
              <h3 className="font-semibold text-white">Reliable & safe</h3>
              <p className="text-sm text-gray-400">Over 10,000 games</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-12 w-px bg-gray-700 hidden lg:block"></div>

          {/* Customer support */}
          <div className="flex items-center space-x-3">
            <MessageCircle className="w-6 h-6 text-orange-500" />
            <div>
              <h3 className="font-semibold text-white">Customer support</h3>
              <p className="text-sm text-gray-400">Human support 24/7</p>
            </div>
          </div>
        </div>

        {/* Trustpilot section */}
        <div className="flex flex-col items-center space-y-1">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-green-500 text-green-500" />
            <span className="text-sm font-medium text-white">Trustpilot</span>
          </div>
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-green-500 text-green-500" />
            ))}
          </div>
          <div className="text-sm">
            <span className="text-white font-medium">TrustScore 4.7</span>
            <span className="text-gray-400 ml-1">788,433 reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
}
