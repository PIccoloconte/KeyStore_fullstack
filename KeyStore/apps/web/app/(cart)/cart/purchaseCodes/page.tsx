"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CreditCard, Copy, CheckCircle } from "lucide-react";
import React from "react";

interface Order {
  _id: string;
  gameId: string;
  keyAssigned: string;
  pricePaid: number;
  title: string;
  imageUrl?: string;
  userId: string;
  createdAt: string;
}

// Componente separato che usa useSearchParams
const PurchaseCodesContent = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [copiedKeys, setCopiedKeys] = useState<string[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const ordersParam = searchParams.get("orders");
    if (ordersParam) {
      try {
        const parsedOrders = JSON.parse(decodeURIComponent(ordersParam));
        setOrders(parsedOrders);
      } catch (error) {
        console.error("Errore nel parsing degli ordini:", error);
      }
    }
  }, [searchParams]);

  const copyToClipboard = async (key: string, orderId: string) => {
    try {
      await navigator.clipboard.writeText(key);
      setCopiedKeys((prev) => [...prev, orderId]);

      // Rimuovi l'indicatore di copiato dopo 3 secondi
      setTimeout(() => {
        setCopiedKeys((prev) => prev.filter((id) => id !== orderId));
      }, 3000);
    } catch (err) {
      console.error("Errore nel copiare la chiave: ", err);
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Nessun ordine trovato</h2>
          <p className="text-gray-400">
            Torna al carrello per effettuare un acquisto.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-white text-3xl font-bold text-center mb-8">
          I tuoi codici di attivazione
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-800 rounded-lg p-8 text-center"
            >
              {/* Game Title */}
              <div className="mb-2">
                <span className="text-orange-500 text-sm font-medium">
                  GAME
                </span>
                <h2 className="text-white text-lg font-medium mt-1">
                  {order.title}
                </h2>
              </div>

              {/* Subtitle */}
              <p className="text-gray-400 text-sm mb-6">
                is now ready for activation
              </p>

              {/* Game Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-blue-500 font-bold text-lg">G</span>
                  </div>
                </div>
              </div>

              {/* Activation Code */}
              <div className="bg-gray-900 rounded-lg p-4 mb-6">
                <code className="text-white text-lg font-mono tracking-wider break-all uppercase">
                  {order.keyAssigned}
                </code>
              </div>

              {/* Copy Button */}
              <Button
                onClick={() => copyToClipboard(order.keyAssigned, order._id)}
                className={`w-full px-8 py-2 rounded-md mb-6 transition-all duration-200 ${
                  copiedKeys.includes(order._id)
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-orange-500 hover:bg-orange-600"
                } text-white`}
              >
                {copiedKeys.includes(order._id) ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy key
                  </>
                )}
              </Button>

              {/* Help Text */}
              <p className="text-gray-500 text-xs mb-4">
                Struggling with how to activate the code? View the activation
                tutorial or contact us
              </p>

              {/* Price paid */}
              <div className="text-center">
                <span className="text-gray-400 text-sm">
                  Paid: €{order.pricePaid.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Print as gift card option */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <CreditCard className="w-5 h-5 text-orange-500" />
          <p className="text-white">Print as gift cards</p>
        </div>
      </div>
    </div>
  );
};

// Componente di loading per Suspense
const LoadingComponent = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="text-white text-center">
      <h2 className="text-2xl font-bold mb-4">Caricamento...</h2>
      <p className="text-gray-400">
        Preparazione dei tuoi codici di attivazione...
      </p>
    </div>
  </div>
);

// Componente principale con Suspense
const PurchaseCodes = () => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <PurchaseCodesContent />
    </Suspense>
  );
};

export default PurchaseCodes;
