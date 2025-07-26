"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React, { useState, useEffect } from "react";
import { formatDate } from "@/utils";

export default function Order() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      //http://localhost:3000/api/orders localhost
      //http://192.168.205.140:3000/api/orders mobile hotspot
      const res = await fetch("http://localhost:3000/api/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Errore nel fetch degli ordini");
      }

      const data = await res.json();
      setOrders(data);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="p-6 text-white">Loading orders...</div>;
  }
  if (orders) {
    console.log("Fetched orders:", orders);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-8">My orders</h1>

        <div className="space-y-6">
          {orders.map((order: any) => (
            <Card key={order.pricePaid} className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                {/* Order Header */}
                <div className="flex items-start gap-4 mb-6">
                  <img
                    src={order.imageUrl || "/placeholder.svg"}
                    alt={order.title}
                    className="w-20 h-20 rounded object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-white mb-2 leading-tight">
                      {order.title}
                    </h3>

                    <div className="text-gray-400 text-sm flex gap-2">
                      Platform:
                      {order.gameId.platform.map((el: any) => (
                        <Badge
                          variant="outline"
                          className="border-red-600 text-white"
                          key={el}
                        >
                          {" " + el}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-gray-400 text-sm mb-1">System: Steam</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-green-900/30 text-green-400 border-green-700"
                    >
                      completed
                    </Badge>
                    <span className="text-lg font-medium text-white">
                      {order.pricePaid} €
                    </span>
                  </div>
                </div>

                <Separator className="bg-gray-700 mb-4" />

                {/* Order Summary */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Tax (0.00%)</span>
                    <span className="text-gray-300">0 €</span>
                  </div>
                  {order.platformFees > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Platform fees</span>
                      <span className="text-gray-300">{order.pricePaid} €</span>
                    </div>
                  )}
                  <Separator className="bg-gray-700" />
                  <div className="flex justify-between font-medium">
                    <span className="text-white">Total</span>
                    <span className="text-white text-lg">
                      {order.pricePaid} €
                    </span>
                  </div>
                </div>

                <Separator className="bg-gray-700 mb-4" />

                {/* Order Details */}
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-4">
                    <span>Order #{order._id}</span>
                    <span>•</span>
                    <span>Paypal</span>
                    <span>•</span>
                    <span>{formatDate(order.createdAt ?? "")}</span>
                  </div>
                  <button className="text-gray-400 hover:text-white underline transition-colors">
                    Download invoice
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
