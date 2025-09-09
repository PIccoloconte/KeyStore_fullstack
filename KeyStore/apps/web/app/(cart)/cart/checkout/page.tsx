"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Edit, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context";
import CreditCard from "@/components/checkout/credit-card";
import BillingAddress from "@/components/checkout/address";
import Paypal from "@/components/checkout/paypal";

const Checkout = () => {
  const [selectedPayment, setSelectedPayment] = useState("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);
  //creditCardFormRef serves to access formik from outside the component
  const creditCardFormRef = useRef<any>(null);
  const [addressFormValid, setAddressFormValid] = useState(false);
  const [creditCardFormValid, setCreditCardFormValid] = useState(false);
  const { cart, isLoggedIn, clearCart } = useAuth();
  const router = useRouter();

  //payment handler
  const handlePayment = async (creditCardData?: any) => {
    setIsProcessing(true);

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token non trovato");
    }

    try {
      let paymentSuccessful = false;

      // Payment handling based on the selected payment method
      switch (selectedPayment) {
        case "credit-card":
          if (!creditCardData) {
            alert("Missing credit card data");
            setIsProcessing(false);
            return;
          }
          // For credit card, proceed with the normal order
          paymentSuccessful = true;
          break;

        case "paypal":
          // For PayPal, the payment logic is handled separately
          paymentSuccessful = true;
          if (!paymentSuccessful) {
            setIsProcessing(false);
            return;
          }
          break;

        default:
          alert("Metodo di pagamento non valido");
          setIsProcessing(false);
          return;
      }

      if (paymentSuccessful) {
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

        // Clear the cart after successful purchase
        clearCart();

        // Redirect to the activation codes page with the orders
        router.push(
          `/cart/purchaseCodes?orders=${encodeURIComponent(
            JSON.stringify(orderData.orders)
          )}`
        );
      }
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

  // Billing address save handler
  const handleBillingAddressSave = (addressData: any) => {
    setAddressFormValid(true);
    console.log("Saving billing address:", addressData);
    //TODO: add logic to save in local storage or in DB
  };

  return (
    <div className="mt-[95px] md:mt-20 min-h-screen text-white p-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Billing Address */}
          <div>
            <h2 className="text-xl font-medium mb-4">Billing address</h2>
            <BillingAddress
              onSave={handleBillingAddressSave}
              setAddressFormValid={setAddressFormValid}
            />
          </div>

          {/* Payment Methods */}
          <div>
            <h2 className="text-xl font-medium mb-4">Payment methods</h2>
            <div className="space-y-3">
              {/* Credit Card */}

              <CreditCard
                selectedPayment={selectedPayment}
                setSelectedPayment={setSelectedPayment}
                handlePayment={handlePayment}
                setCreditCardFormValid={setCreditCardFormValid}
                creditCardFormRef={creditCardFormRef}
              />

              {/* PayPal Pay */}

              <Paypal
                selectedPayment={selectedPayment}
                setSelectedPayment={setSelectedPayment}
                handlePayment={handlePayment}
              />
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
                      <div className="font-medium text-sm mb-1 text-white">
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
                <div className="flex justify-between text-lg font-medium text-white">
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
                  onClick={() => {
                    if (
                      selectedPayment === "credit-card" &&
                      creditCardFormRef.current
                    ) {
                      //When I click on the "Pay with Credit Card" button, I trigger the onSubmit inside credit-card.tsx which calls handlePayment
                      creditCardFormRef.current.submitForm();
                    } else {
                      handlePayment();
                    }
                  }}
                  disabled={
                    isProcessing ||
                    (selectedPayment === "credit-card" &&
                      (!creditCardFormValid || !addressFormValid)) ||
                    selectedPayment === "paypal"
                  }
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 font-medium py-3 mt-6 cursor-pointer"
                >
                  {isProcessing ? "Processing..." : "Pay with Credit Card"}
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
