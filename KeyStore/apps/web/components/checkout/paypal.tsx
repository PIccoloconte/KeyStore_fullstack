"use client";
import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useAuth } from "@/context";
import { Card, CardContent } from "@/components/ui/card";

const initialPayPalOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
  currency: "EUR", // Aggiungi questa riga per far in modod che PayPal usi Euro
};

interface PaypalProps {
  selectedPayment: string;
  setSelectedPayment: (payment: string) => void;
  handlePayment: (creditCardData?: any) => void;
}

const Paypal = ({
  selectedPayment,
  setSelectedPayment,
  handlePayment,
}: PaypalProps) => {
  //when the button paypal is clicked
  const onCreateOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token non trovato");
    }

    try {
      const response = await fetch("http://localhost:3000/api/paypal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("PayPal order created with ID:", data.orderID);

      return data.orderID;
    } catch (error) {
      console.error("Error creating PayPal order:", error);
      throw error;
    }
  };
  //on confirm payment
  const onApprove = async (data: any) => {
    console.log("PayPal Checkout onApprove data:", data);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token non trovato");
      }
      if (!data?.orderID) throw new Error("Order ID non trovato in data");

      const response = await fetch(
        `http://localhost:3000/api/paypal/capturePayment/${data.orderID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      console.log("PayPal payment capture result:", result);

      handlePayment();
    } catch (error) {
      console.log("Error verify paypal order:", error);
    }
  };
  const onError = (err: any) => {
    console.error("PayPal Checkout onError", err);
    //TODO:add redirect to an error page
  };

  return (
    <Card
      className={`bg-gray-800 cursor-pointer transition-colors ${
        selectedPayment === "paypal"
          ? "border-orange-500 border-2"
          : "border-gray-700 hover:border-gray-600"
      }`}
      onClick={() => setSelectedPayment("paypal")}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">PP</span>
          </div>
          <span className="font-medium">PayPal</span>
        </div>
        {selectedPayment === "paypal" && (
          <div className="mt-4">
            <PayPalScriptProvider options={initialPayPalOptions}>
              <PayPalButtons
                createOrder={onCreateOrder}
                onApprove={onApprove}
                onError={onError}
                //fundingSource to show only paypal button
                fundingSource="paypal"
              ></PayPalButtons>
            </PayPalScriptProvider>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Paypal;
