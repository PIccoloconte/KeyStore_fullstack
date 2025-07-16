import { Star, MapPin, Globe, Euro, MessageCircle, Gift, Newspaper } from "lucide-react"

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
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                Terms of Use
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                Privacy policy
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                Affiliation Program
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                Contact us
              </a>
            </div>

            <div className="space-y-3 pt-2">
              <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5 text-orange-500" />
                <span>Our Discord Bot</span>
              </a>
              <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                <Gift className="w-5 h-5 text-orange-500" />
                <span>Redeem a Gift Card</span>
              </a>
              <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
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
                className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-black rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center hover:bg-purple-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.571 4.714h.857v14.572h-.857V4.714zm2.715 0h.857v14.572h-.857V4.714zM8.857 4.714h.857v14.572h-.857V4.714zm-2.715 0h.857v14.572h-.857V4.714zm-2.714 0h.857v14.572H3.428V4.714zM.714 4.714h.857v14.572H.714V4.714zm21.572 0h.857v14.572h-.857V4.714zm-2.715 0h.857v14.572h-.857V4.714zm-2.714 0h.857v14.572h-.857V4.714z" />
                </svg>
              </a>
            </div>

            {/* App Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="bg-gray-800 rounded-lg px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 transition-colors cursor-pointer">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Available on the</span>
                  <span className="text-sm font-semibold">App Store</span>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 transition-colors cursor-pointer">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.699 12l1.999-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Get it on</span>
                  <span className="text-sm font-semibold">Google Play</span>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 transition-colors cursor-pointer">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 16.568A7.952 7.952 0 0112 20a7.952 7.952 0 01-5.568-2.432A7.952 7.952 0 014 12a7.952 7.952 0 012.432-5.568A7.952 7.952 0 0112 4a7.952 7.952 0 015.568 2.432A7.952 7.952 0 0120 12a7.952 7.952 0 01-2.432 5.568z" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Chrome</span>
                  <span className="text-sm font-semibold">Extension</span>
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
            <div className="text-sm text-gray-400">Copyright © 2025 Instant Gaming - All rights reserved</div>

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
  )
}
