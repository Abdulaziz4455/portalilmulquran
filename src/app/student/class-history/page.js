"use client";
import React from "react";
import { useAuth } from "@/app/common/auth-context";
import StudentDashboardLayout from "@/app/student_dashboard_layout/layout";

const Page = () => {
  const { studentInfo } = useAuth();

  return (
    <StudentDashboardLayout>
      <div className="flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-7xl h-[80vh] overflow-y-auto">
          <h3 className="text-3xl font-bold text-teal-800 mb-8">
            Class History
          </h3>

          {/* Desktop Table */}
          <div className="hidden md:block">
            <table className="w-full bg-white border-collapse border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-teal-800 text-white text-sm uppercase">
                  <th className="px-4 py-4 border-b border-gray-300 w-1/12">
                    S ID
                  </th>
                  <th className="px-4 py-4 border-b border-gray-300 w-1/12">
                    F ID
                  </th>
                  <th className="px-4 py-4 border-b border-gray-300 w-1/7">
                    Name
                  </th>
                  <th className="px-4 py-4 border-b border-gray-300 w-1/7">
                    Course
                  </th>
                  <th className="px-4 py-4 border-b border-gray-300 w-1/4">
                    Content
                  </th>
                  <th className="px-4 py-4 border-b border-gray-300 w-1/6">
                    Status
                  </th>
                  <th className="px-4 py-4 border-b border-gray-300 w-1/6">
                    Teacher
                  </th>
                  <th className="px-4 py-4 border-b border-gray-300 w-1/6">
                    T-Feedback
                  </th>
                  <th className="px-4 py-4 border-b border-gray-300 w-1/6">
                    Supervisor
                  </th>
                  <th className="px-4 py-4 border-b border-gray-300 w-1/6">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentInfo?.class_history?.map((history, index) => (
                  <tr
                    key={index}
                    className="hover:bg-teal-100 transition-colors text-sm"
                  >
                    <td className="px-4 py-3 border-b border-r border-gray-300">
                      {history.student_id}
                    </td>
                    <td className="px-4 py-3 border-b border-r border-gray-300">
                      {history.family_id}
                    </td>
                    <td className="px-4 py-3 border-b border-r border-gray-300">
                      {history.student_name}
                    </td>
                    <td className="px-4 py-3 border-b border-r border-gray-300">
                      {history.course_name}
                    </td>
                    <td className="px-4 py-3 border-b border-r border-gray-300">
                      {history.course_contents}
                    </td>
                    <td className="px-4 py-3 border-b border-r border-gray-300">
                      {history.class_status}
                    </td>
                    <td className="px-4 py-3 border-b border-r border-gray-300">
                      {history.current_assignee}
                    </td>
                    <td className="px-4 py-3 border-b border-r border-gray-300">
                      {history.teacher_feedback}
                    </td>
                    <td className="px-4 py-3 border-b border-r border-gray-300">
                      {history.current_follower}
                    </td>
                    <td className="px-4 py-3 border-b border-r border-gray-300">
                      {new Date(history.lesson_date).toLocaleDateString(
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

          {/* Mobile View Cards */}
          <div className="block md:hidden space-y-6">
            {studentInfo?.class_history?.map((history, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-teal-600 transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-teal-800 font-semibold text-lg md:text-xl">
                    {history.student_name}
                  </div>
                  <div className="text-gray-600 text-sm md:text-base">
                    {new Date(history.lesson_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
                <div className="text-gray-700 space-y-3">
                  <div className="flex justify-between">
                    <div className="font-medium text-teal-700">Student ID:</div>
                    <div className="text-gray-800">{history.student_id}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium text-teal-700">Family ID:</div>
                    <div className="text-gray-800">{history.family_id}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium text-teal-700">
                      Course Name:
                    </div>
                    <div className="text-gray-800">{history.course_name}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium text-teal-700">
                      Course Contents:
                    </div>
                    <div className="text-gray-800">
                      {history.course_contents}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium text-teal-700">Teacher:</div>
                    <div className="text-gray-800">
                      {history.current_assignee}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium text-teal-700">
                      Teacher Feedback:
                    </div>
                    <div className="text-gray-800">
                      {history.teacher_feedback}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StudentDashboardLayout>
  );
};

export default Page;
