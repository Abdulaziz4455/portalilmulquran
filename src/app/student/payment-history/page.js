"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import StudentDashboardLayout from "@/app/student_dashboard_layout/layout";
import { useAuth } from "@/app/common/auth-context";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";

export default function PaymentDetails() {
  const [showTransactionId, setShowTransactionId] = useState({});
  const { studentInfo } = useAuth();

  const toggleTransactionId = (index) => {
    setShowTransactionId((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <title>ilmulQuran Payment History</title>

      <StudentDashboardLayout>
        <div className="bg-gray-50 min-h-screen">
          <h2 className="text-4xl font-bold text-teal-700 mb-6">
            Payments History
          </h2>

          {/* Payment Table for Desktop */}
          <div className="hidden md:block overflow-x-auto mb-4">
            <table className="w-full max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-teal-300">
              <thead className="bg-teal-700 text-white text-left text-sm uppercase sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3">Payment ID</th>
                  <th className="px-4 py-3">Invoice ID</th>
                  <th className="px-4 py-3">Transaction ID</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Payment Mode</th>
                  <th className="px-4 py-3">Payment Method</th>
                  <th className="px-4 py-3">Payment Date</th>
                  <th className="px-4 py-3">Date Recorded</th>
                </tr>
              </thead>
              <tbody>
                {studentInfo?.payment_history?.map((payment, index) => (
                  <tr
                    key={index}
                    className={`border-b text-sm ${
                      index % 2 === 0 ? "bg-teal-50" : "bg-white"
                    } hover:bg-teal-100 transition-colors`}
                  >
                    <td className="px-4 py-3">{payment.payment_id}</td>
                    <td className="px-4 py-3">{payment.invoice_no}</td>
                    <td className="px-4 py-3 flex items-center space-x-2">
                      {payment.transactionid}
                    </td>
                    <td className="px-4 py-3">{payment.amount}</td>
                    <td className="px-4 py-3">{payment.paymentmode}</td>
                    <td className="px-4 py-3">{payment.paymentmethod}</td>
                    <td className="px-4 py-3">
                      {new Date(payment.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(payment.daterecorded).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card Layout for Mobile */}
          <div className="block md:hidden space-y-4 mt-6">
            {studentInfo?.payment_history?.map((payment, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-4 border border-teal-300"
              >
                <div className="text-teal-700 font-bold">
                  Payment ID: {payment.payment_id}
                </div>
                <div className="text-gray-700 mt-1 space-y-1">
                  <p>Invoice ID: {payment.invoice_no}</p>
                  <p className="flex items-center">
                    Transaction ID:{" "}
                    <span className="ml-1">{payment.transactionid}</span>
                    <button
                      onClick={() => toggleTransactionId(index)}
                      className="ml-2 text-teal-500 hover:text-teal-700 transition"
                    >
                      {showTransactionId[index] ? (
                        <EyeOffIcon className="h-5 w-5 inline" />
                      ) : (
                        <EyeIcon className="h-5 w-5 inline" />
                      )}
                    </button>
                  </p>
                  <p>Amount: {payment.amount}</p>
                  <p>Payment Mode: {payment.paymentmode}</p>
                  <p>Payment Method: {payment.paymentmethod}</p>
                  <p>
                    Payment Date:{" "}
                    {new Date(payment.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p>
                    Date Recorded:{" "}
                    {new Date(payment.daterecorded).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </StudentDashboardLayout>
    </>
  );
}
