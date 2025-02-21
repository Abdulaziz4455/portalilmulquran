"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import StudentDashboardLayout from "@/app/student_dashboard_layout/layout";
import { useAuth } from "@/app/common/auth-context";
import { toast } from "react-toastify";
import currencies from "@/lib/paypalCurrencies";

const PaymentDetails = () => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState(""); // Single payment method
  const [amount, setAmount] = useState();
  const [editedAmount, setEditedAmount] = useState("");
  const [family, setFamily] = useState("");
  const [currency, setCurrency] = useState("");
  const [error, setError] = useState(false);
  const { studentInfo } = useAuth();
  const email = studentInfo?.email;
  const userid = studentInfo?.userid;
  const [availablePaymentMethods, setAvailablePaymentMethods] = useState([]);

  useEffect(() => {
    const fetchPaymentData = async () => {
      if (!studentInfo) return;
      const dueAmount = studentInfo?.family_data[0].total_due_amount;
      setAmount(dueAmount || 0);
      setEditedAmount(dueAmount || "");
      setFamily(studentInfo?.family_data[0].family_name);
      setCurrency(studentInfo?.family_data[0].currency);
    };

    fetchPaymentData();
  }, [studentInfo]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      if (!userid) return;

      try {
        const response = await axios.get("/api/payment_methods/get");
        const paymentMethods = response.data.data;
        setAvailablePaymentMethods(paymentMethods);

        // Set the first payment method as default
        if (paymentMethods.length > 0) {
          setPaymentMethod(paymentMethods[0].MethodName.toLowerCase());
        }
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      }
    };

    fetchPaymentMethods();
  }, [userid]);

  // Handle radio button change (only one option at a time)
  const handlePaymentMethodChange = (e) => {
    const { value } = e.target;
    setPaymentMethod(value); // Update payment method to the selected one
  };

  const handleAmountChange = (e) => {
    setEditedAmount(e.target.value);
  };

  const handleSubmit = async () => {
    const amountToSubmit = parseFloat(editedAmount);

    if (!currency) {
      toast.error("Please select a currency before proceeding.");
      return;
    }

    if (amountToSubmit > 0) {
      if (paymentMethod === "paypal") {
        // PayPal logic
        const isCurrencyAvailable = currencies.some(
          (currencyItem) =>
            currencyItem.currency_code === currency.toUpperCase()
        );
        if (isCurrencyAvailable) {
          router.push(
            `/student/payment/paypal?amount=${amountToSubmit}&currency=${currency}&email=${email}&familyId=${userid}`
          );
        } else {
          toast.error(
            "The selected currency is not supported for PayPal payments."
          );
        }
      } else if (paymentMethod === "debit/credit card") {
        // Handle Stripe payment
        await placeOrder(amountToSubmit, currency);
      } else {
        toast.error("No valid payment method selected.");
      }
    } else {
      toast.error("Please enter an amount greater than zero.");
    }
  };

  const placeOrder = async (amount, currency) => {
    try {
      const response = await axios.post("/api/stripe-orders", {
        currency,
        amount,
        email,
        userid,
        family,
      });
      if (response.data.success) {
        window.location.replace(response.data.session_url);
      } else {
        toast.error("Error creating Stripe session.");
      }
    } catch (error) {
      console.error("Error processing Stripe payment:", error);
      toast.error("Payment processing error. Please try again.");
    }
  };

  return (
    <>
      <StudentDashboardLayout>
        <div className="w-full p-6">
          <div className="bg-white shadow-lg rounded-lg p-6 border border-teal-300">
            <h2 className="text-3xl font-bold mb-6 text-teal-700">
              Payment Details
            </h2>
            <div className="overflow-x-auto">
              <div className="grid gap-6 sm:gap-0 sm:grid-cols-1 lg:grid-cols-1">
                {/* Desktop Table */}
                <table className="hidden lg:table min-w-full w-full bg-white shadow-md rounded-lg overflow-hidden border border-teal-300">
                  <thead>
                    <tr className="bg-teal-700 text-white text-left text-sm uppercase">
                      {!error && (
                        <th className="px-6 py-4 font-semibold border-teal-300 border">
                          Family Name
                        </th>
                      )}
                      <th className="px-6 py-4 font-semibold border-teal-300 border">
                        Currency
                      </th>
                      <th className="px-6 py-4 font-semibold border-teal-300 border">
                        Due Amount
                      </th>
                      <th className="px-6 py-4 font-semibold border-teal-300 border">
                        Pay By
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-teal-100">
                    <tr className="hover:bg-teal-50 transition-colors duration-200">
                      <td className="px-6 py-4 text-gray-600 border-teal-300 border font-medium">
                        {family}
                      </td>
                      <td className="px-6 py-4 text-gray-600 border-teal-300 border font-medium">
                        {currency}
                      </td>
                      <td className="px-6 py-4 border-teal-300 border">
                        <input
                          type="number"
                          value={editedAmount}
                          onChange={handleAmountChange}
                          className="w-full px-3 py-2 border bg-gray-50 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                          min="0"
                        />
                      </td>
                      <td className="px-6 py-4 border-teal-300 border">
                        {/* Radio buttons side by side */}
                        <div className="flex space-x-6">
                          {availablePaymentMethods
                            .filter((method) => method.Available === true)
                            .map((method, index) => (
                              <div
                                key={index}
                                className={`flex items-center space-x-2 ${
                                  paymentMethod ===
                                  method.MethodName.toLowerCase()
                                    ? "bg-teal-100 border-teal-500 border-2"
                                    : "bg-white border-teal-300"
                                } p-2 rounded-md hover:bg-teal-50 transition-colors`}
                              >
                                <input
                                  type="radio"
                                  id={method.MethodName}
                                  name="paymentMethod"
                                  value={method.MethodName.toLowerCase()}
                                  checked={
                                    paymentMethod ===
                                    method.MethodName.toLowerCase()
                                  }
                                  onChange={handlePaymentMethodChange}
                                  className="mr-2"
                                />
                                <label
                                  htmlFor={method.MethodName}
                                  className="text-lg text-gray-700"
                                >
                                  {method.MethodName}
                                </label>
                              </div>
                            ))}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Mobile Card UI */}
                <div className="lg:hidden flex flex-col gap-4">
                  <div className="bg-white shadow-lg rounded-lg p-4 border border-teal-300">
                    <h3 className="text-xl font-semibold text-teal-700">
                      Family Name
                    </h3>
                    <p className="text-gray-600">{family || "N/A"}</p>
                  </div>

                  <div className="bg-white shadow-lg rounded-lg p-4 border border-teal-300">
                    <h3 className="text-xl font-semibold text-teal-700">
                      Currency
                    </h3>
                    <p className="text-gray-600">{currency || "N/A"}</p>
                  </div>

                  <div className="bg-white shadow-lg rounded-lg p-4 border border-teal-300">
                    <h3 className="text-xl font-semibold text-teal-700">
                      Due Amount
                    </h3>
                    <input
                      type="number"
                      value={editedAmount}
                      onChange={handleAmountChange}
                      className="w-full mt-2 px-3 py-2 border bg-gray-50 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                      min="0"
                      placeholder="Enter Due Amount"
                    />
                  </div>

                  <div className="bg-white shadow-lg rounded-lg p-4 border border-teal-300">
                    <h3 className="text-xl font-semibold text-teal-700">
                      Pay By
                    </h3>
                    <div className="flex space-x-6">
                      {availablePaymentMethods
                        .filter((method) => method.Available === true)
                        .map((method, index) => (
                          <div
                            key={index}
                            className={`flex items-center space-x-2 ${
                              paymentMethod === method.MethodName.toLowerCase()
                                ? "bg-teal-100 border-teal-500 border-2"
                                : "bg-white border-teal-300"
                            } p-2 rounded-md hover:bg-teal-50 transition-colors`}
                          >
                            <input
                              type="radio"
                              id={method.MethodName}
                              name="paymentMethod"
                              value={method.MethodName.toLowerCase()}
                              checked={
                                paymentMethod ===
                                method.MethodName.toLowerCase()
                              }
                              onChange={handlePaymentMethodChange}
                              className="mr-2"
                            />
                            <label
                              htmlFor={method.MethodName}
                              className="text-lg text-gray-700"
                            >
                              {method.MethodName}
                            </label>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={handleSubmit}
                  className="w-full lg:w-auto px-4 py-2 rounded-md text-white bg-teal-600 hover:bg-teal-700 font-medium shadow-md transition-all duration-200"
                >
                  Proceed to Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </StudentDashboardLayout>
    </>
  );
};

export default PaymentDetails;
