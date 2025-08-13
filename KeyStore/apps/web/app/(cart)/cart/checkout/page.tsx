"use client";
//tornare qua se qualcosa va storto
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Edit, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { handlePayPalPayment, handleApplePayPayment } from "@/utils"; // Importa la funzione PayPal dal file utils

// Schema di validazione per i metodi di pagamento
const creditCardSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .required("Numero carta obbligatorio")
    .matches(
      /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/,
      "Formato numero carta non valido"
    )
    .test("luhn", "Numero carta non valido", (value) => {
      if (!value) return false;
      const number = value.replace(/\s/g, "");
      let sum = 0;
      let alternate = false;
      for (let i = number.length - 1; i >= 0; i--) {
        let n = parseInt(number.charAt(i), 10);
        if (alternate) {
          n *= 2;
          if (n > 9) n = (n % 10) + 1;
        }
        sum += n;
        alternate = !alternate;
      }
      return sum % 10 === 0;
    }),
  expiryDate: Yup.string()
    .required("Data scadenza obbligatoria")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato MM/YY richiesto")
    .test("expiry", "Carta scaduta", (value) => {
      if (!value) return false;
      const [month, year] = value.split("/");
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
      const now = new Date();
      return expiry > now;
    }),
  cvv: Yup.string()
    .required("CVV obbligatorio")
    .matches(/^\d{3,4}$/, "CVV deve essere di 3 o 4 cifre"),
  cardholderName: Yup.string()
    .required("Nome titolare obbligatorio")
    .min(2, "Nome troppo corto")
    .matches(/^[a-zA-Z\s]+$/, "Solo lettere e spazi permessi"),
});

const Checkout = () => {
  const [selectedPayment, setSelectedPayment] = useState("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);
  //creditCardFormRef serve per accedere a formik da fuori il componente
  const creditCardFormRef = useRef<any>(null);
  const [creditCardFormValid, setCreditCardFormValid] = useState(false);
  const { cart, isLoggedIn, clearCart } = useAuth();
  const router = useRouter();

  // Valori iniziali per il form della carta di credito
  const initialCreditCardValues = {
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  };

  // Funzione per formattare il numero della carta
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  // Funzione per formattare la data di scadenza
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  //gestione pagamento
  const handlePayment = async (creditCardData?: any) => {
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
      let paymentSuccessful = false;

      // Gestione basata sul metodo di pagamento selezionato
      switch (selectedPayment) {
        case "credit-card":
          if (!creditCardData) {
            alert("Dati carta di credito mancanti");
            setIsProcessing(false);
            return;
          }
          // Per la carta di credito, procedi con l'ordine normale
          paymentSuccessful = true;
          break;

        case "paypal":
          paymentSuccessful = await handlePayPalPayment();
          if (!paymentSuccessful) {
            setIsProcessing(false);
            return;
          }
          break;

        case "apple":
          paymentSuccessful = await handleApplePayPayment(cart);
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
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token non trovato");
        }

        // Prepara i dati dell'ordine includendo il metodo di pagamento
        const orderPayload = {
          paymentMethod: selectedPayment,
          ...(selectedPayment === "credit-card" && {
            creditCardInfo: {
              last4: creditCardData.cardNumber.slice(-4),
              cardholderName: creditCardData.cardholderName,
            },
          }),
        };

        const response = await fetch("http://localhost:3000/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderPayload),
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
              {/* Credit Card */}
              <Card
                className={`bg-gray-800 cursor-pointer transition-colors ${
                  selectedPayment === "credit-card"
                    ? "border-orange-500 border-2"
                    : "border-gray-700 hover:border-gray-600"
                }`}
                onClick={() => setSelectedPayment("credit-card")}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                      </svg>
                    </div>
                    <span className="font-medium">Credit Card</span>
                  </div>
                  {/* Credit Card Form - Only show when credit card is selected */}
                  {selectedPayment === "credit-card" && (
                    <Formik
                      initialValues={initialCreditCardValues}
                      validationSchema={creditCardSchema}
                      //viene chiamato tramite creditCardFormRef dal bottone PAY
                      onSubmit={(values) => {
                        handlePayment(values);
                      }}
                      innerRef={creditCardFormRef}
                    >
                      {({
                        values,
                        setFieldValue,
                        errors,
                        touched,
                        isValid,
                      }) => {
                        // Usa useEffect per aggiornare lo stato di validità senza causare re-render
                        useEffect(() => {
                          setCreditCardFormValid(isValid);
                        }, [isValid]);

                        return (
                          <Form className="space-y-4 mt-2">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">
                                Card Number
                              </label>
                              <Field
                                name="cardNumber"
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                                  errors.cardNumber && touched.cardNumber
                                    ? "border-red-500"
                                    : "border-gray-600"
                                }`}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  const formatted = formatCardNumber(
                                    e.target.value
                                  );
                                  setFieldValue("cardNumber", formatted);
                                }}
                                value={values.cardNumber}
                                maxLength={19}
                              />
                              <ErrorMessage
                                name="cardNumber"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Expiry Date
                                </label>
                                <Field
                                  name="expiryDate"
                                  type="text"
                                  placeholder="MM/YY"
                                  className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                                    errors.expiryDate && touched.expiryDate
                                      ? "border-red-500"
                                      : "border-gray-600"
                                  }`}
                                  onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                  ) => {
                                    const formatted = formatExpiryDate(
                                      e.target.value
                                    );
                                    setFieldValue("expiryDate", formatted);
                                  }}
                                  value={values.expiryDate}
                                  maxLength={5}
                                />
                                <ErrorMessage
                                  name="expiryDate"
                                  component="div"
                                  className="text-red-500 text-sm mt-1"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  CVV
                                </label>
                                <Field
                                  name="cvv"
                                  type="text"
                                  placeholder="123"
                                  className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                                    errors.cvv && touched.cvv
                                      ? "border-red-500"
                                      : "border-gray-600"
                                  }`}
                                  maxLength={4}
                                />
                                <ErrorMessage
                                  name="cvv"
                                  component="div"
                                  className="text-red-500 text-sm mt-1"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">
                                Cardholder Name
                              </label>
                              <Field
                                name="cardholderName"
                                type="text"
                                placeholder="John Doe"
                                className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                                  errors.cardholderName &&
                                  touched.cardholderName
                                    ? "border-red-500"
                                    : "border-gray-600"
                                }`}
                              />
                              <ErrorMessage
                                name="cardholderName"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>
                          </Form>
                        );
                      }}
                    </Formik>
                  )}
                </CardContent>
              </Card>

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

              {/* PayPal Pay */}
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
                  onClick={() => {
                    if (
                      selectedPayment === "credit-card" &&
                      creditCardFormRef.current
                    ) {
                      //Eseguo il submit del mio form della carta di credito cosi da chiamare l'handlePayment dal form
                      creditCardFormRef.current.submitForm();
                    } else {
                      handlePayment();
                    }
                  }}
                  disabled={
                    isProcessing ||
                    (selectedPayment === "credit-card" && !creditCardFormValid)
                  }
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 font-medium py-3 mt-6 cursor-pointer"
                >
                  {isProcessing
                    ? "Processing..."
                    : selectedPayment === "credit-card"
                    ? "Pay with Credit Card"
                    : selectedPayment === "paypal"
                    ? "Pay with PayPal"
                    : "Pay with Apple Pay"}
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
