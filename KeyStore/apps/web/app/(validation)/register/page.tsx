"use client";
import React, { useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff, User, Mail, Lock, UserPlus } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

// Tipi TypeScript
interface RegistrationFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Schema di validazione con Yup
const registrationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username deve contenere almeno 3 caratteri")
    .max(20, "Username non può superare 20 caratteri")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username può contenere solo lettere, numeri e underscore"
    )
    .required("Username è obbligatorio"),

  email: Yup.string()
    .email("Formato email non valido")
    .required("Email è obbligatoria"),

  password: Yup.string()
    .min(8, "Password deve contenere almeno 8 caratteri")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password deve contenere almeno una lettera minuscola, una maiuscola e un numero"
    )
    .required("Password è obbligatoria"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Le password non corrispondono")
    .required("Conferma password è obbligatoria"),
});

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const initialValues: RegistrationFormValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // const handleSubmit = async (values: RegistrationFormValues) => {
  //   try {
  //     setSubmitStatus(null);
  //     // Qui puoi fare la chiamata reale al backend, oppure lasciare la simulazione:
  //     console.log("Dati di registrazione:", values);
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     setSubmitStatus("success");
  //   } catch (error) {
  //     setSubmitStatus("error");
  //   }
  // };

  const handleSubmit = async (values: RegistrationFormValues) => {
    try {
      setSubmitStatus(null);
      {
        /*"http://192.168.205.140:3000/api/auth/register" mobile hotspot*/
      }
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
            <UserPlus className="w-6 h-6" />
            Registrazione
          </CardTitle>
          <CardDescription className="text-center">
            Crea il tuo account compilando i campi sottostanti
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Formik
            initialValues={initialValues}
            validationSchema={registrationSchema}
            onSubmit={handleSubmit}
          >
            {({
              errors,
              touched,
              isSubmitting,
              handleSubmit: formikHandleSubmit,
            }) => (
              <form className="space-y-4" onSubmit={formikHandleSubmit}>
                {/* React form wrapper */}
                {/* Username Field */}
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Field
                      as={Input}
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Inserisci il tuo username"
                      className={`pl-10 ${
                        errors.username && touched.username
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                  </div>
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Inserisci la tua email"
                      className={`pl-10 ${
                        errors.email && touched.email ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Inserisci la tua password"
                      className={`pl-10 pr-10 ${
                        errors.password && touched.password
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Conferma Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Field
                      as={Input}
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Conferma la tua password"
                      className={`pl-10 pr-10 ${
                        errors.confirmPassword && touched.confirmPassword
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <Alert className="border-green-500 bg-green-50">
                    <AlertDescription className="text-green-700">
                      Registrazione completata con successo!
                    </AlertDescription>
                  </Alert>
                )}

                {submitStatus === "error" && (
                  <Alert className="border-red-500 bg-red-50">
                    <AlertDescription className="text-red-700">
                      Si è verificato un errore durante la registrazione.
                      Riprova.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registrazione in corso..." : "Registrati"}
                </Button>
              </form>
            )}
          </Formik>

          {/* Login Link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Hai già un account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Accedi qui
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
