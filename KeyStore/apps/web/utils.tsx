export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // I mesi partono da 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Gestione del pagamento PayPal
export const handlePayPalPayment = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch("http://localhost:3000/api/paypal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data.orderId;
  } catch (error) {
    console.error("Error creating PayPal order:", error);
    throw error;
  }
};

// Gestione del pagamento Apple Pay
export const handleApplePayPayment = async (cart: { items: any[] }) => {
  try {
    // Controllo se Apple Pay è disponibile
    if (typeof window !== "undefined" && (window as any).ApplePaySession) {
      const ApplePaySession = (window as any).ApplePaySession;

      if (!ApplePaySession.canMakePayments()) {
        alert("Apple Pay non è disponibile su questo dispositivo");
        return false;
      }

      // Configurazione della richiesta Apple Pay
      const request = {
        countryCode: "IT",
        currencyCode: "EUR",
        supportedNetworks: ["visa", "masterCard", "amex"],
        merchantCapabilities: ["supports3DS"],
        total: {
          label: "KeyStore",
          amount: cart
            ? cart.items
                .reduce(
                  (total, item) => total + item.price * (item.quantity || 1),
                  0
                )
                .toFixed(2)
            : "0.00",
        },
      };

      const session = new ApplePaySession(3, request);

      session.onvalidatemerchant = (event: any) => {
        // In un'applicazione reale, qui valideresti il merchant con Apple
        console.log("Validate merchant:", event);
      };

      session.onpaymentauthorized = (event: any) => {
        // In un'applicazione reale, qui elaboreresti il pagamento
        console.log("Payment authorized:", event.payment);
        session.completePayment(ApplePaySession.STATUS_SUCCESS);
      };

      session.begin();
      return true;
    } else {
      alert("Apple Pay non è supportato su questo browser/dispositivo");
      return false;
    }
  } catch (error) {
    console.error("Errore Apple Pay:", error);
    return false;
  }
};
