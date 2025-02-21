"use client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import StudentDashboardLayout from "@/app/student_dashboard_layout/layout";
import { useAuth } from "@/app/common/auth-context";

export default function ClassesSchedule() {
  const [studentClasses, setStudentClasses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const router = useRouter();
  const { studentInfo } = useAuth();
  const userid = studentInfo?.userid;
  const modalRef = useRef(null);
  const [loadingHistory, setLoadingHistory] = useState(false); // Loading state for class history

  const handleHistoryClick = (stdId) => {
    console.log("student id is", stdId);

    setModalVisible(true);
    const historyData = studentInfo?.class_history?.filter(
      (history) => history.student_id === stdId
    );

    setHistoryData(historyData); // Set the filtered history data
    setModalVisible(true); // Show the modal
  };

  const closeModal = () => {
    setModalVisible(false);
    setHistoryData([]);
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (modalVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalVisible]);

  const handleAddStudentClick = () => {
    router.push("/student/add-new");
  };

  return (
    <>
      <title>ilmulQuran Class Schedule</title>
      <StudentDashboardLayout>
        <div className="p-6 bg-gray-50 min-h-screen">
          <h2 className="text-4xl font-bold text-teal-700 mb-8">
            Student Classes
          </h2>

          {/* Add Student Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={handleAddStudentClick}
              className="bg-teal-500 text-white py-2 px-6 rounded-full shadow-md hover:bg-teal-600 transition-all duration-200"
            >
              Add Student
            </button>
          </div>

          {/* Classes Table for Desktop */}
          <div className="hidden md:block">
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden border border-teal-300">
              <thead>
                <tr className="bg-teal-700 text-white text-left text-xs uppercase">
                  <th className="px-4 py-3">Std Id</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Course</th>
                  <th className="px-4 py-3">History</th>
                  <th className="px-4 py-3">Teacher</th>
                  <th className="px-4 py-3">Supervisor</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Reg. Date</th>
                </tr>
              </thead>
              <tbody>
                {studentInfo?.class_schedule?.map((studentClass, index) => (
                  <tr
                    key={index}
                    className={`text-sm hover:bg-teal-100 transition-colors`}
                  >
                    <td className="px-4 py-3 border border-gray-300">
                      {studentClass.student_id}
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      {studentClass.student_name}
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      {studentClass.course_name}
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      <button
                        className="text-teal-600 underline hover:text-teal-800"
                        onClick={() =>
                          handleHistoryClick(studentClass.student_id)
                        }
                      >
                        View History
                      </button>
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      {studentClass.teacher_name}
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      {studentClass.supervisor_name}
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      <span
                        className={
                          studentClass.class_status === "Missed" ||
                          studentClass.class_status === "Not Taking Classes"
                            ? "text-red-600 font-semibold"
                            : ""
                        }
                      >
                        {studentClass.class_status}
                      </span>
                    </td>
                    <td className="px-4 py-3 border border-teal-300">
                      {new Date(
                        studentClass.registration_date
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card Layout for Mobile */}
          <div className="block md:hidden space-y-6">
            {studentInfo?.class_schedule?.map((studentClass, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl p-6 border border-teal-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-teal-700 font-bold text-lg mb-2">
                  Student ID:{" "}
                  <span className="font-normal">{studentClass.student_id}</span>
                </div>
                <div className="text-gray-800 text-md mb-2">
                  <strong>Student Name:</strong> {studentClass.student_name}
                </div>
                <div className="text-gray-800 text-md mb-2">
                  <strong>Course:</strong> {studentClass.course_name}
                </div>
                <div className="text-gray-800 text-md mb-2">
                  <strong>Teacher:</strong> {studentClass.teacher_name}
                </div>
                <div className="text-gray-800 text-md mb-2">
                  <strong>Supervisor:</strong> {studentClass.supervisor_name}
                </div>
                <div className="text-gray-800 text-md mb-2">
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      studentClass.class_status === "Missed" ||
                      studentClass.class_status === "Not Taking Classes"
                        ? "text-red-600 font-semibold"
                        : "text-green-600 font-semibold"
                    }
                  >
                    {studentClass.class_status}
                  </span>
                </div>
                <div className="text-gray-800 text-md mb-4">
                  <strong>Registration Date:</strong>{" "}
                  {new Date(studentClass.registration_date).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </div>
                <button
                  className="mt-2 text-teal-600 underline hover:text-teal-800 font-semibold"
                  onClick={() => handleHistoryClick(studentClass.student_id)}
                >
                  View History
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for Class History */}
        {modalVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 p-6 z-50">
            <div
              ref={modalRef}
              className="bg-white rounded-2xl shadow-xl py-6 px-3 w-full max-w-7xl h-[80vh] overflow-y-auto border border-teal-300"
            >
              {/* Close Button at the Top */}
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="bg-teal-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-teal-600 transition-all duration-200"
                >
                  Close
                </button>
              </div>

              <h3 className="text-2xl font-semibold text-teal-700 mb-4">
                Class History
              </h3>

              {/* Loading State */}
              {loadingHistory ? (
                <div className="text-center py-4 text-teal-600 font-semibold">
                  Loading...
                </div>
              ) : (
                <div>
                  {/* Class History Table on Desktop */}
                  <div className="hidden md:block">
                    <table className="w-full bg-white shadow-md rounded-lg overflow-hidden border border-teal-300">
                      <thead>
                        <tr className="bg-teal-700 text-white text-sm uppercase">
                          <th className="px-3 py-3 text-center font-semibold">
                            ID
                          </th>
                          <th className="px-3 py-3 text-center font-semibold">
                            F-ID
                          </th>
                          <th className="px-4 py-3 text-center font-semibold">
                            Name
                          </th>
                          <th className="px-4 py-3 text-center font-semibold">
                            Course
                          </th>
                          <th className="px-4 py-3 text-center font-semibold">
                            Contents
                          </th>
                          <th className="px-4 py-3 text-center font-semibold">
                            Status
                          </th>
                          <th className="px-4 py-3 text-center font-semibold">
                            Teacher
                          </th>
                          <th className="px-1 py-3 text-center font-semibold">
                            T-Feedback
                          </th>
                          <th className="px-4 py-3 text-center font-semibold">
                            Supervisor
                          </th>
                          <th className="px-4 py-3 text-center font-semibold">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {historyData.map((history, index) => (
                          <tr
                            key={index}
                            className={`text-sm hover:bg-teal-100 transition-colors`}
                          >
                            <td className="px-6 py-4 border border-r border-gray-300 text-center">
                              {history.student_id}
                            </td>
                            <td className="px-6 py-4 border border-r border-gray-300 text-center">
                              {history.family_id}
                            </td>
                            <td className="px-6 py-4 border border-r border-gray-300 text-center">
                              {history.student_name}
                            </td>
                            <td className="px-6 py-4 border border-r border-gray-300 text-center">
                              {history.course_name}
                            </td>
                            <td className="px-6 py-4 border border-r border-gray-300 text-center">
                              {history.course_contents}
                            </td>
                            <td className="px-6 py-4 border border-r border-gray-300 text-center">
                              {history.class_status}
                            </td>
                            <td className="px-6 py-4 border border-r border-gray-300 text-center">
                              {history.current_assignee}
                            </td>
                            <td className="px-6 py-4 border border-r border-gray-300 text-center">
                              {history.teacher_feedback}
                            </td>
                            <td className="px-6 py-4 border border-r border-gray-300 text-center">
                              {history.current_follower}
                            </td>
                            <td className="px-6 py-4 border text-center">
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

                  {/* Mobile View */}
                  <div className="block md:hidden space-y-6">
                    {historyData.map((history, index) => (
                      <div
                        key={index}
                        className="bg-white shadow-lg rounded-xl p-6 border border-teal-200 transition-all duration-300 hover:shadow-2xl hover:scale-105"
                      >
                        <div className="text-teal-600 text-xl font-semibold mb-3">
                          Student ID:{" "}
                          <span className="font-normal text-gray-800">
                            {history.student_id}
                          </span>
                        </div>

                        <div className="text-gray-800 text-lg mb-2">
                          <span className="font-semibold text-teal-600">
                            Family Id:
                          </span>{" "}
                          {history.family_id}
                        </div>

                        <div className="text-gray-800 text-lg mb-2">
                          <span className="font-semibold text-teal-600">
                            Student Name:
                          </span>{" "}
                          {history.student_name}
                        </div>

                        <div className="text-gray-800 text-lg mb-2">
                          <span className="font-semibold text-teal-600">
                            Course Name:
                          </span>{" "}
                          {history.course_name}
                        </div>

                        <div className="text-gray-800 text-lg mb-2">
                          <span className="font-semibold text-teal-600">
                            Course Contents:
                          </span>{" "}
                          {history.course_contents}
                        </div>

                        <div className="text-gray-800 text-lg mb-2">
                          <span className="font-semibold text-teal-600">
                            Class Status:
                          </span>{" "}
                          {history.class_status}
                        </div>

                        <div className="text-gray-800 text-lg mb-2">
                          <span className="font-semibold text-teal-600">
                            Teacher Name:
                          </span>{" "}
                          {history.current_assignee}
                        </div>

                        <div className="text-gray-800 text-lg mb-2">
                          <span className="font-semibold text-teal-600">
                            Teacher Feedback:
                          </span>{" "}
                          {history.teacher_feedback}
                        </div>

                        <div className="text-gray-800 text-lg mb-2">
                          <span className="font-semibold text-teal-600">
                            Supervisor:
                          </span>{" "}
                          {history.current_follower}
                        </div>

                        <div className="text-gray-800 text-lg">
                          <span className="font-semibold text-teal-600">
                            Lesson Date:
                          </span>
                          {new Date(history.lesson_date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </StudentDashboardLayout>
    </>
  );
}
