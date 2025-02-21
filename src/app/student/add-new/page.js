"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import StudentDashboardLayout from "@/app/student_dashboard_layout/layout";
import { useAuth } from "@/app/common/auth-context";
export default function AddStudentPage() {
    const [courses, setCourses] = useState([]);
    const [durations, setDurations] = useState([]);
    const [days, setDays] = useState([]);
    const [sessions, setSessions] = useState([]);
    // const userName = localStorage.getItem("user_name");
    const { studentInfo } = useAuth();
    const email = studentInfo?.email;

    const [formData, setFormData] = useState({
        name: "",
        course: "",
        startDate: new Date().toISOString().slice(0, 10), // Current date in YYYY-MM-DD format
        duration: "",
        description: "",
        day2: "",
        session: ""
    });

    useEffect(() => {
        const fetchData = async () => {

            try {
                const [coursesResponse, durationsResponse, daysResponse, sessionsResponse] = await Promise.all([
                    axios.get(`/api/courseslist/getdata`),
                    axios.get(`/api/classduration/getdata`),
                    axios.get(`/api/dayslist/getdata`),
                    axios.get(`/api/timesessinlist/getdata`)
                ]);

                setCourses(coursesResponse.data.items);
                setDurations(durationsResponse.data.items);
                setDays(daysResponse.data.items);
                setSessions(sessionsResponse.data.items);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            P_STUDENT_NAME: formData.name,
            P_COURSE: formData.course,
            P_CLASS_DURATION: formData.duration,
            P_DESCRIPTION: formData.description,
            P_DAYS: formData.day2,
            P_TIME_SESSION: formData.session,
            P_EMAIL: email
        };
        if (!email) return;

        try {
            const response = await axios.post("/api/addstudent/postdata", payload)
            console.log("Student added successfully:", response.data);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <StudentDashboardLayout>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Add Student</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="name">
                                Student Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="course">
                                Course
                            </label>
                            <select
                                id="course"
                                name="course"
                                value={formData.course}
                                onChange={handleChange}
                                required
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                            >
                                <option value="">Select a course</option>
                                {courses.map((course) => (
                                    <option key={course.course_name} value={course.course_name}>
                                        {course.course_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="startDate">
                                Start Date
                            </label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="duration">
                                Class Duration
                            </label>
                            <select
                                id="duration"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                required
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                            >
                                <option value="">Select duration</option>
                                {durations.map((duration) => (
                                    <option key={duration.class_duration} value={duration.class_duration}>
                                        {duration.class_duration}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="8" // Further increase rows for larger height
                            required
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 min-h-[150px]" // Added min-h for fixed height
                        />

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="day2">
                                Select Day
                            </label>
                            <select
                                id="day2"
                                name="day2"
                                value={formData.day2}
                                onChange={handleChange}
                                required
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                            >
                                <option value="">Select a day</option>
                                {days.map((day) => (
                                    <option key={day.days_name} value={day.days_name}>
                                        {day.days_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="session">
                                Session
                            </label>
                            <select
                                id="session"
                                name="session"
                                value={formData.session}
                                onChange={handleChange}
                                required
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                            >
                                <option value="">Select a session</option>
                                {sessions.map((session, index) => (
                                    <option key={index} value={session.time_session}>
                                        {session.time_session}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 transition"
                    >
                        Add Student
                    </button>
                </form>
            </div>
        </StudentDashboardLayout>


    );
}
