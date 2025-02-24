"use client";
import { useEffect, useState } from "react";
import {
  AcademicCapIcon,
  BanknotesIcon,
  CreditCardIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";

import StudentDashboardLayout from "@/app/student_dashboard_layout/layout";

export default function DashboardPage() {
  const initialTime = {
    hours: 2,
    minutes: 30,
    seconds: 45,
  };

  const [remainingTime, setRemainingTime] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        const { hours, minutes, seconds } = prevTime;

        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(interval);
          return { hours: 0, minutes: 0, seconds: 0 };
        }

        let newHours = hours;
        let newMinutes = minutes;
        let newSeconds = seconds - 1;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }
        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }

        return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);



  return (
    <>
    
      <title>ilmulQuran Student Dashboard</title>
      <StudentDashboardLayout>
        <div className="pt-4 min-h-screen ">
          <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto border border-gray-200">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
              Welcome, <span className="text-teal-500">Student</span>
            </h2>
            <p className="text-sm text-gray-500 text-center mb-8">
              Manage your class schedule, payments, and invoices here.
            </p>

            {/* Countdown Timer */}
            <div className="text-center mb-10">
              <h3 className="text-sm font-medium text-teal-400 mb-2">
                Next Class In:
              </h3>
              <p className="text-2xl font-semibold text-gray-700">
                {remainingTime.hours.toString().padStart(2, "0")}:
                {remainingTime.minutes.toString().padStart(2, "0")}:
                {remainingTime.seconds.toString().padStart(2, "0")}
              </p>
            </div>

            {/* Dashboard Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Class Schedule Card */}
              <Link href="/student/class-schedule">
                <div className="flex items-center bg-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <ClockIcon className="h-8 w-8 mr-3 text-teal-500" />
                  <div>
                    <h3 className="text-base font-medium text-gray-700">
                      Class Schedule
                    </h3>
                    <p className="text-xs text-gray-500">
                      View your upcoming classes and their schedules.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Invoice Info Card */}
              <Link href="/student/invoice-info">
                <div className="flex items-center bg-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <BanknotesIcon className="h-8 w-8 mr-3 text-teal-500" />
                  <div>
                    <h3 className="text-base font-medium text-gray-700">
                      Invoice Info
                    </h3>
                    <p className="text-xs text-gray-500">
                      Access your latest invoices and billing details.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Payments History Card */}
              <Link href="/student/payment-history">
                <div className="flex items-center bg-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CreditCardIcon className="h-8 w-8 mr-3 text-teal-500" />
                  <div>
                    <h3 className="text-base font-medium text-gray-700">
                      Payments History
                    </h3>
                    <p className="text-xs text-gray-500">
                      Review your payments and transaction history.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Pay Now Card */}
              <Link href="/student/payment">
                <div className="flex items-center bg-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <AcademicCapIcon className="h-8 w-8 mr-3 text-teal-500" />
                  <div>
                    <h3 className="text-base font-medium text-gray-700">
                      Pay Now
                    </h3>
                    <p className="text-xs text-gray-500">
                      Make a payment for your upcoming classes.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </StudentDashboardLayout>
    </>
  );
}
