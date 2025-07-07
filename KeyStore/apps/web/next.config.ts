import type { NextConfig } from "next";

/*process.env.NODE_ENV è una variabile d'ambiente che Next.js (e Node.js in generale) usa per indicare l'ambiente corrente.
Se stai eseguendo npm run dev, NODE_ENV sarà "development".
Se stai eseguendo npm run build e poi npm start, NODE_ENV sarà "production".*/

const isDev = process.env.NODE_ENV === "development";
const API_URL = isDev
  ? "http://localhost:3001" // backend locale in sviluppo
  : process.env.NEXT_PUBLIC_API_URL; // backend deployato in produzione

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_URL}/api/:path*`,
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
