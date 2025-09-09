import {
  Star,
  MapPin,
  Globe,
  Euro,
  MessageCircle,
  Gift,
  Newspaper,
} from "lucide-react";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main footer content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Trustpilot Section */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-green-400 fill-current" />
              <span className="text-green-400 font-semibold">Trustpilot</span>
            </div>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-green-400 fill-current" />
              ))}
            </div>
            <div className="text-sm text-gray-300">
              <span className="font-semibold">TrustScore 4.7</span>
              <span className="ml-2">786,453 reviews</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-4">
            <div className="space-y-3">
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Terms of Use
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Privacy policy
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Affiliation Program
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Contact us
              </a>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href="#"
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-orange-500" />
                <span>Our Discord Bot</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
              >
                <Gift className="w-5 h-5 text-orange-500" />
                <span>Redeem a Gift Card</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
              >
                <Newspaper className="w-5 h-5 text-orange-500" />
                <span>Find the latest video game news</span>
              </a>
            </div>
          </div>

          {/* Social Media and Apps */}
          <div className="flex flex-col space-y-6">
            {/* Social Media Icons */}
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-10 h-10 bg-[#25D366] rounded-lg flex items-center justify-center hover:bg-[#1b8b44] transition-colors"
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-black rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <FaXTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-colors"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-800 transition-colors"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>

            {/* App Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="bg-gray-800 rounded-lg px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 transition-colors cursor-pointer">
                <FaGooglePlay className="w-6 h-6" />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">
                    Available on the
                  </span>
                  <span className="text-sm font-semibold">App Store</span>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 transition-colors cursor-pointer">
                <FaApple className="w-6 h-6" />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Get it on</span>
                  <span className="text-sm font-semibold">Google Play</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-400">
              Copyright © 2025 Instant Gaming - All rights reserved
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>Italy</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Globe className="w-4 h-4" />
                <span>English</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Euro className="w-4 h-4" />
                <span>EUR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
