import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main
      style={{ minHeight: "100vh", padding: "2rem", background: "#f9f9f9" }}
    >
      {children}
    </main>
  );
}
