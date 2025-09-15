export const getApiUrl = () => {
  // Use the same logic as in next.config.ts
  const isDev = process.env.NODE_ENV === "development";

  return isDev ? "http://localhost:3000" : process.env.NEXT_PUBLIC_API_URL;
};
