"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context";

const Checkout = () => {
  const [selectedPayment, setSelectedPayment] = useState("revolut");
  const [isProcessing, setIsProcessing] = useState(false);
  const { cart, isLoggedIn, clearCart } = useAuth();
  const router = useRouter();

  const handlePayment = async () => {
    if (!isLoggedIn) {
      alert("È necessario effettuare l'accesso per completare l'acquisto");
      router.push("/login");
      return;
    }

    if (!cart || cart.items.length === 0) {
      alert("Il carrello è vuoto");
      return;
    }

    setIsProcessing(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token non trovato");
      }

      const response = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Errore durante il pagamento");
      }

      const orderData = await response.json();

      // Svuota il carrello dopo l'acquisto riuscito
      clearCart();

      // Reindirizza alla pagina dei codici di attivazione con gli ordini
      router.push(
        `/cart/purchaseCodes?orders=${encodeURIComponent(
          JSON.stringify(orderData.orders)
        )}`
      );
    } catch (error) {
      console.error("Errore durante il pagamento:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Errore durante il pagamento. Riprova."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Billing Address */}
          <div>
            <h2 className="text-xl font-medium mb-4">Billing address</h2>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="font-medium">marco cencig</div>
                    <div className="text-gray-400">via ulivi 227</div>
                    <div className="text-gray-400">Switzerland</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Methods */}
          <div>
            <h2 className="text-xl font-medium mb-4">Payment methods</h2>
            <div className="space-y-3">
              {/* Apple Pay */}
              <Card
                className={`bg-gray-800 border-gray-700 cursor-pointer transition-colors ${
                  selectedPayment === "apple"
                    ? "border-orange-500"
                    : "hover:border-gray-600"
                }`}
                onClick={() => setSelectedPayment("apple")}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                      </svg>
                    </div>
                    <span className="font-medium">Apple Pay</span>
                  </div>
                </CardContent>
              </Card>

              {/* Revolut Pay */}
              <Card
                className={`bg-gray-800 cursor-pointer transition-colors ${
                  selectedPayment === "revolut"
                    ? "border-orange-500 border-2"
                    : "border-gray-700 hover:border-gray-600"
                }`}
                onClick={() => setSelectedPayment("revolut")}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                      <span className="text-white font-bold text-sm">R</span>
                    </div>
                    <span className="font-medium">Revolut Pay</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Right Column - Summary */}
        <div>
          <h2 className="text-xl font-medium mb-4">Summary</h2>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 space-y-6">
              {/* Products */}
              {cart &&
                cart.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium text-sm mb-1">
                        {item.title}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {item.platform?.join(", ") || "Digital"}
                      </div>
                      {item.quantity > 1 && (
                        <div className="text-gray-400 text-sm">
                          Quantity: {item.quantity}
                        </div>
                      )}
                    </div>
                    <div className="text-gray-400 ml-4">
                      €{(item.price * (item.quantity || 1)).toFixed(2)}
                    </div>
                  </div>
                ))}

              {/* Gift Card Notice */}
              <div className="flex items-start space-x-2 text-sm text-gray-400">
                <Gift className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  You will also be able to print it as a gift card after
                  purchase
                </span>
              </div>

              <div className="border-t border-gray-700 pt-4 space-y-3">
                {/* VAT */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">VAT (0%)</span>
                  <span className="text-gray-400">0 €</span>
                </div>

                {/* Total */}
                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>
                    €
                    {cart
                      ? cart.items
                          .reduce(
                            (total, item) =>
                              total + item.price * (item.quantity || 1),
                            0
                          )
                          .toFixed(2)
                      : "0.00"}
                  </span>
                </div>

                {/* Payment Button */}
                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 font-medium py-3 mt-6 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? "Processing..." : "Pay"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
