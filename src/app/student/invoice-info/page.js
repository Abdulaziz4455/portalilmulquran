"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import StudentDashboardLayout from "@/app/student_dashboard_layout/layout";
import { useAuth } from "@/app/common/auth-context";
import Link from "next/link";
export default function InvoiceDetailsPage() {
  const { studentInfo } = useAuth();

  return (
    <>
      <title>ilmulQuran Invoice Info</title>
      <StudentDashboardLayout>
        <div className="bg-gray-50 min-h-screen p-4">
          {/* Pay Now Button */}
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-teal-700 mb-6">
              Invoice Information
            </h2>
            <Link
              href={"/student/payment"}
              className="bg-teal-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-teal-700 transition duration-200"
            >
              Pay Now
            </Link>
          </div>

          {/* Invoices Table for Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden border border-teal-300">
              <thead className="bg-teal-600 text-white text-left text-sm uppercase sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 border-teal-300 border">
                    Invoice No
                  </th>
                  <th className="px-6 py-3 border-teal-300 border">
                    Invoice Date
                  </th>
                  <th className="px-6 py-3 border-teal-300 border">Status</th>
                  <th className="px-6 py-3 border-teal-300 border">Due Date</th>
                  <th className="px-6 py-3 border-teal-300 border">Currency</th>
                  <th className="px-6 py-3 border-teal-300 border">
                    Adjustment
                  </th>
                  <th className="px-6 py-3 border-teal-300 border">Total</th>
                </tr>
              </thead>
              <tbody>
                {studentInfo?.invoice_info?.map((invoice, index) => (
                  <tr
                    key={index}
                    className={`border-b text-sm ${
                      index % 2 === 0 ? "bg-teal-50" : "bg-white"
                    } hover:bg-teal-100 transition-colors`}
                  >
                    <td className="px-6 py-3 border-teal-300 border">
                      {invoice.inv_no}
                    </td>
                    <td className="px-6 py-3 border-teal-300 border">
                      {new Date(invoice.invoice_date).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </td>
                    <td className="px-6 py-3 border-teal-300 border">
                      <span
                        className={`font-semibold ${
                          invoice.status === "Cancelled"
                            ? "text-red-600"
                            : invoice.status === "Paid"
                            ? "text-green-600"
                            : "text-black"
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 border-teal-300 border">
                      {new Date(invoice.due_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-3 border-teal-300 border">
                      {invoice.currency}
                    </td>
                    <td className="px-6 py-3 border-teal-300 border">
                      {invoice.adjustment}
                    </td>
                    <td className="px-6 py-3 border-teal-300 border">
                      {invoice.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card Layout for Mobile */}
          <div className="block md:hidden space-y-4 mt-6">
            {studentInfo?.invoice_info?.map((invoice, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-4 border border-teal-300"
              >
                <div className="text-teal-700 font-bold">
                  Invoice No: {invoice.inv_no}
                </div>
                <div className="text-gray-700 mt-1">
                  <p>
                    Invoice Date:{" "}
                    {new Date(invoice.invoice_date).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                  <p>
                    Due Date:{" "}
                    {new Date(invoice.due_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p>Currency: {invoice.currency}</p>
                  <p>Adjustment: {invoice.adjustment}</p>
                  <p>Total: {invoice.total}</p>
                  <p>
                    Status:{" "}
                    <span
                      className={`font-semibold ${
                        invoice.status === "Cancelled"
                          ? "text-red-600"
                          : invoice.status === "Paid"
                          ? "text-green-600"
                          : "text-black"
                      }`}
                    >
                      {invoice.status}
                    </span>
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
