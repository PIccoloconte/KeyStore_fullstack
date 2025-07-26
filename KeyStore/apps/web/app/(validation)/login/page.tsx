"use client";
import { useAuth } from "@/context";
import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff, User, Lock, LogIn } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { useRouter } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Tipi TypeScript
interface LoginFormValues {
  username: string;
  password: string;
}

// Schema di validazione con Yup
const loginSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username deve contenere almeno 3 caratteri")
    .required("Username è obbligatorio"),

  password: Yup.string()
    .min(6, "Password deve contenere almeno 6 caratteri")
    .required("Password è obbligatoria"),
});

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<
    "success" | "error" | null
  >(null);
  const [rememberMe, setRememberMe] = React.useState(false);

  const initialValues: LoginFormValues = {
    username: "",
    password: "",
  };

  // const handleLogin = async (username: string, password: string) => {
  //   const res = await fetch("/api/login", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ username, password }),
  //   });
  //   const data = await res.json();
  //   if (data.status === "ok" && data.data) {
  //     login(data.data); // Salva il token nel context e localStorage
  //     // Puoi anche reindirizzare l’utente dove vuoi
  //     // router.push("/");
  //   } else {
  //     // Gestisci errore login
  //   }
  // };

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      setSubmitStatus(null);

      // Chiamata API al backend per il login
      {
        /*http://192.168.205.140:3000/api/auth/login mobile hotspot
        http://localhost:3000/api/auth/login localhost*/
      }
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      const data = await res.json();

      if (res.ok && data.status === "ok" && data.data) {
        const { _id, username, createdAt } = data.user;
        login(data.data, { _id, username, createdAt }); // Salva il token e l'utente nel context e localStorage
        setSubmitStatus("success");
        // redirect to home page
        router.push("/");
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
            <LogIn className="w-6 h-6" />
            Accedi
          </CardTitle>
          <CardDescription className="text-center">
            Inserisci le tue credenziali per accedere al tuo account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({
              errors,
              touched,
              isSubmitting,
              handleSubmit: formikHandleSubmit,
            }) => (
              <form className="space-y-4" onSubmit={formikHandleSubmit}>
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

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      id="remember"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <Label htmlFor="remember" className="text-sm text-gray-600">
                      Ricordami
                    </Label>
                  </div>
                  <a
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Password dimenticata?
                  </a>
                </div>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <Alert className="border-green-500 bg-green-50">
                    <AlertDescription className="text-green-700">
                      Login effettuato con successo!
                    </AlertDescription>
                  </Alert>
                )}

                {submitStatus === "error" && (
                  <Alert className="border-red-500 bg-red-50">
                    <AlertDescription className="text-red-700">
                      Credenziali non valide. Riprova.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Accesso in corso..." : "Accedi"}
                </Button>
              </form>
            )}
          </Formik>

          {/* Divider */}
          <div className="mt-6 mb-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">oppure</span>
              </div>
            </div>
          </div>

          {/* Registration Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Non hai ancora un account?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Registrati qui
              </a>
            </p>
          </div>

          {/* Demo Info */}
          <div className="mt-4 p-3 bg-gray-100 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              <strong>Demo:</strong> Usa "admin" come username e "password" come
              password
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default LoginPage;
