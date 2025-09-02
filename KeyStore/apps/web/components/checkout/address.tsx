"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Edit, Save, X } from "lucide-react";

// Validation schema
const billingAddressSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full name required")
    .min(2, "Name too short")
    .matches(/^[a-zA-Z\s]+$/, "Only letters and spaces allowed"),
  address: Yup.string()
    .required("Address required")
    .min(5, "Address too short"),
  city: Yup.string().required("City required").min(2, "City too short"),
  postalCode: Yup.string()

    .required("Postal code required")
    .matches(/^[0-9]{4,6}$/, "Invalid postal code"),
  country: Yup.string()
    .required("Country required")
    .min(2, "Country too short"),
});

interface BillingAddressData {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface BillingAddressProps {
  initialData?: BillingAddressData;
  onSave?: (data: BillingAddressData) => void;
}
//starting data
const BillingAddress: React.FC<BillingAddressProps> = ({
  initialData = {
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  },
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(true);

  const handleSave = (values: BillingAddressData) => {
    if (onSave) {
      onSave(values);
    }
    setIsEditing(false);
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-6">
        <Formik
          initialValues={initialData}
          validationSchema={billingAddressSchema}
          onSubmit={handleSave}
        >
          {({ values, errors, touched, resetForm }) => {
            const hasFormData = () => {
              return !!(
                values.fullName &&
                values.address &&
                values.city &&
                values.postalCode &&
                values.country
              );
            };
            return (
              <Form>
                {!isEditing ? (
                  // Display Mode
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="font-medium">{values.fullName}</div>
                      <div className="text-gray-400">{values.address}</div>
                      <div className="text-gray-400">
                        {values.city}, {values.postalCode}
                      </div>
                      <div className="text-gray-400">{values.country}</div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  // Edit Mode
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">
                        Edit Billing Address
                      </h3>
                      {/*Save button*/}
                      <div className="flex space-x-2">
                        <Button
                          type="submit"
                          variant="ghost"
                          size="sm"
                          className="text-green-400 hover:text-green-300"
                        >
                          <Save className="w-4 h-4" />
                        </Button>
                        {/*Cancel button*/}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className={`${
                            hasFormData()
                              ? "text-red-400 hover:text-red-300"
                              : "text-gray-600 cursor-not-allowed"
                          }`}
                          disabled={!hasFormData()}
                          onClick={() => {
                            resetForm();
                            setIsEditing(true);
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/*User name*/}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Full Name
                      </label>
                      <Field
                        name="fullName"
                        type="text"
                        className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                          errors.fullName && touched.fullName
                            ? "border-red-500"
                            : "border-gray-600"
                        }`}
                      />
                      <ErrorMessage
                        name="fullName"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    {/* Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Address
                      </label>
                      <Field
                        name="address"
                        type="text"
                        className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                          errors.address && touched.address
                            ? "border-red-500"
                            : "border-gray-600"
                        }`}
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    {/* City */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          City
                        </label>
                        <Field
                          name="city"
                          type="text"
                          className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                            errors.city && touched.city
                              ? "border-red-500"
                              : "border-gray-600"
                          }`}
                        />
                        <ErrorMessage
                          name="city"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      {/* Postal code */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Postal Code
                        </label>
                        <Field
                          name="postalCode"
                          type="text"
                          className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                            errors.postalCode && touched.postalCode
                              ? "border-red-500"
                              : "border-gray-600"
                          }`}
                        />
                        <ErrorMessage
                          name="postalCode"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Country
                      </label>
                      <Field
                        name="country"
                        type="text"
                        className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                          errors.country && touched.country
                            ? "border-red-500"
                            : "border-gray-600"
                        }`}
                      />
                      <ErrorMessage
                        name="country"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
                )}
              </Form>
            );
          }}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default BillingAddress;
