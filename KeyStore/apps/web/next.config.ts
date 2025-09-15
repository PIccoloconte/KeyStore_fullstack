import type { NextConfig } from "next";

/*process.env.NODE_ENV è una variabile d'ambiente che Next.js (e Node.js in generale) usa per indicare l'ambiente corrente.
Se stai eseguendo npm run dev, NODE_ENV sarà "development".
Se stai eseguendo npm run build e poi npm start, NODE_ENV sarà "production".*/

const isDev = process.env.NODE_ENV === "development";
const API_URL = isDev
  ? "http://localhost:3000" // local backend in development //fino al 14/09/25 usavo la porta 3001 , ma per errore e funzionava
  : // "http://192.168.205.140:3000" // local backend with hotspot mobile
    process.env.NEXT_PUBLIC_API_URL; // backend deployed in production

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_URL}/api/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**", // accept all images from Unsplash
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "/**", // accept all images from Unsplash
      },
    ],
  },
};

export default nextConfig;
