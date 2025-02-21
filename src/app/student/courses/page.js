"use client";
import { AcademicCapIcon } from "@heroicons/react/outline";
import StudentDashboardLayout from "@/app/student_dashboard_layout/layout";

export default function CoursesPage() {
    const regularCourses = [
        "Learn Noorani Qaida Online",
        "Quran Reading with Tajweed",
        "Memorize Quran Online",
        "Learn Tafsir Online",
        "Learn Arabic Online",
        "Learn Islamic Studies Online",
        "Taleem ul Islam",
        "Quran Translation Course",
        "Online Ijazah Course",
        "Learn Ten Qirat Online",
    ];

    const shortCourses = [
        "Memorization of Selected Surahs",
        "Learn Daily Supplication Online",
        "Pillars of Islam",
        "Fiqh (Islamic Jurisprudence)",
        "Seerah (Life of Muhammad)",
        "Aqeedah (Islamic Beliefs)",
        "Islamic History",
        "Ramadan Special Courses",
        "The Companions of Muhammad",
        "Stories of the Prophets",
    ];

    return (
        <>
            <title>ilmulQuran Courses</title>
            <StudentDashboardLayout>
                <div className="min-h-screen bg-gray-100 py-12">
                    <div className="max-w-6xl mx-auto p-5 bg-white shadow-lg rounded-lg border border-teal-200">
                        <h2 className="text-4xl font-bold text-teal-800 text-center mb-8">
                            Explore Our Courses
                        </h2>
                        <p className="text-gray-600 text-lg text-center mb-10">
                            Find the perfect course to deepen your understanding of Islam and the Quran.
                        </p>

                        {/* Regular Courses Section */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-semibold text-teal-600 mb-6">
                                Regular Courses
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {regularCourses.map((course, index) => (
                                    <div
                                        key={index}
                                        className="bg-teal-50 p-6 rounded-lg shadow-md hover:shadow-lg border border-teal-200 hover:bg-teal-100 transition duration-200"
                                    >
                                        <AcademicCapIcon className="h-12 w-12 text-teal-800 mb-4" />
                                        <h4 className="text-lg font-bold text-teal-800">{course}</h4>
                                        <p className="text-sm text-gray-600 mt-2">
                                            Learn more about {course} in an interactive and engaging way.
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Short Courses Section */}
                        <div>
                            <h3 className="text-2xl font-semibold text-teal-600 mb-6">
                                Short Courses
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {shortCourses.map((course, index) => (
                                    <div
                                        key={index}
                                        className="bg-teal-50 p-6 rounded-lg shadow-md hover:shadow-lg border border-teal-200 hover:bg-teal-100 transition duration-200"
                                    >
                                        <AcademicCapIcon className="h-12 w-12 text-teal-800 mb-4" />
                                        <h4 className="text-lg font-bold text-teal-800">{course}</h4>
                                        <p className="text-sm text-gray-600 mt-2">
                                            Enhance your knowledge with {course}.
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </StudentDashboardLayout>
        </>
    );
}
