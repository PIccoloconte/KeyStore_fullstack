import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Schema di validazione
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

interface CreditCardProps {
  selectedPayment: string;
  setSelectedPayment: (payment: string) => void;
  handlePayment: (creditCardData?: any) => void;
  setCreditCardFormValid: (valid: boolean) => void;
  creditCardFormRef: React.RefObject<any>;
}

const CreditCard: React.FC<CreditCardProps> = ({
  selectedPayment,
  setSelectedPayment,
  handlePayment,
  setCreditCardFormValid,
  creditCardFormRef,
}) => {
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

  return (
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
            onSubmit={(values) => {
              handlePayment(values);
            }}
            innerRef={creditCardFormRef}
          >
            {({ values, setFieldValue, errors, touched, isValid }) => {
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const formatted = formatCardNumber(e.target.value);
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const formatted = formatExpiryDate(e.target.value);
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
                        errors.cardholderName && touched.cardholderName
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
  );
};

export default CreditCard;
