import CartNavbar from "@/components/cart-components/cart-navbar";
import Footer from "@/components/footer";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main
      style={{ minHeight: "100vh", padding: "2rem", background: "#f9f9f9" }}
    >
      <CartNavbar></CartNavbar>
      {children}
      <Footer></Footer>
    </main>
  );
}
