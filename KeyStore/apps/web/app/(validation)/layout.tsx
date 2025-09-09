import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ minHeight: "100vh", background: "#f9f9f9" }}>
      {children}
    </main>
  );
}
