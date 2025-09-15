"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React, { useState, useEffect } from "react";
import { formatDate } from "@/utils";
import { getApiUrl } from "@/utils/config";

export default function Order() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch orders from the API
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(`${getApiUrl()}/api/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle error responses
      if (!res.ok) {
        throw new Error("Error fetching orders");
      }

      const data = await res.json();
      setOrders(data);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  // Show loading state while fetching orders
  if (loading) {
    return (
      <div>
        <div className="w-full h-[382px] bg-gray-700 animate-pulse rounded-lg first:mb-4"></div>
        <div className="w-full h-[382px] bg-gray-700 animate-pulse rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse gap-4">
      {orders.map((order: any) => (
        <Card key={order._id} className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            {/* Order Header */}
            <div className="flex items-start gap-4 mb-6 justify-between">
              {/* Order Image ,title, platformn price */}
              <img
                src={order.imageUrl || "/placeholder.svg"}
                alt={order.title}
                className="w-20 h-20 rounded object-cover flex-shrink-0"
              />
              <div className="flex-1  hidden md:block">
                <h3 className="text-lg font-medium text-white mb-2 leading-tight">
                  {order.title}
                </h3>

                <div className="text-gray-400 text-sm flex gap-2">
                  Platform:
                  {order.gameId.platform.map((el: any) => (
                    <Badge
                      variant="outline"
                      className="border-orange-500 text-white"
                      key={el}
                    >
                      {" " + el}
                    </Badge>
                  ))}
                </div>
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
            <div className="md:hidden text-gray-400 text-sm flex gap-2 mb-2 flex-wrap">
              Platform:
              {order.gameId.platform.map((el: any) => (
                <Badge
                  variant="outline"
                  className="border-orange-500 text-white"
                  key={el}
                >
                  {" " + el}
                </Badge>
              ))}
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
                <span className="text-white text-lg">{order.pricePaid} €</span>
              </div>
              <Separator className="bg-gray-700" />
              {/*Game key*/}
              <div className="flex justify-between font-medium">
                <span className="text-white">Key</span>
                <span className="text-white  md:text-lg uppercase">
                  {order.keyAssigned}
                </span>
              </div>
            </div>

            <Separator className="bg-gray-700 mb-4" />

            {/* Order Details */}
            <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-between text-sm text-gray-400">
              <div className="flex items-center gap-4 w-full md:w-auto justify-between">
                {/* Order ID and Date */}
                <span className="w-max">Order #{order._id}</span>

                <span className="hidden md:block ">•</span>
                <span>{formatDate(order.createdAt ?? "")}</span>
              </div>
              <button className=" w-full md:w-auto text-start md:text-right text-gray-400 hover:text-white underline transition-colors cursor-pointer ">
                Download invoice
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
