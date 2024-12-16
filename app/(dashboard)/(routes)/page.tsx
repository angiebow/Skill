"use client"; // Add this at the top

import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  createdAt: string;
  description: string;
  imageUrl: string;
  category: string;
  chapters: { title: string; isFree: boolean }[]; // Make sure this field exists
  price: string;
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [paid, setPaid] = useState<string | null>(null);

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("/api/courses"); // Replace with appropriate API endpoint
      const data = await response.json();
      setCourses(data);
    };

    fetchCourses();
  }, []);

  // Function to open modal and set selected course
  const openModal = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  // Handle course purchase
  const purchaseCourse = () => {
    setPaid("a1"); // Mark course as paid
    console.log("Course purchased. Paid status:", paid);
    if (paid === "a1") {
      alert("You have successfully purchased the course!");
      closeModal();
    }
  };

  return (
    <div>
      <UserButton afterSwitchSessionUrl="/" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            <h3 className="text-xl font-semibold">{course.title}</h3>
            <p className="text-sm text-gray-500">
              Created: {new Date(course.createdAt).toLocaleDateString()}
            </p>
            <Button className="mt-4" onClick={() => openModal(course)}>
              View Course
            </Button>
          </div>
        ))}
      </div>

      {/* Modal for displaying course details */}
      {isModalOpen && selectedCourse ? (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-semibold">{selectedCourse.title}</h2>
            <p className="text-sm text-gray-500">
              Created: {new Date(selectedCourse.createdAt).toLocaleDateString()}
            </p>

            {/* Conditional rendering for image */}
            {selectedCourse.imageUrl ? (
              <img
                src={selectedCourse.imageUrl}
                alt={selectedCourse.title}
                className="w-full h-auto mt-4"
              />
            ) : (
              <p className="mt-4 text-gray-500">No image available</p>
            )}

            <h3 className="mt-4 text-lg font-semibold">Category: {selectedCourse.category}</h3>
            <p className="mt-2">Description: {selectedCourse.description}</p>

            <h4 className="mt-4 font-semibold">Chapters:</h4>
            {selectedCourse.chapters && selectedCourse.chapters.length > 0 ? (
              <ul className="list-disc ml-6">
                {selectedCourse.chapters.map((chapter, index) => (
                  <li key={index}>
                    {chapter.title} {chapter.isFree ? "(Free)" : "(Paid)"}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No chapters available for this course.</p>
            )}

            <p className="mt-4 text-lg font-semibold">Price: {selectedCourse.price}</p>
            <Button onClick={purchaseCourse} className="mt-4">
              {paid === "a1" ? "Purchased" : "Buy Course"}
            </Button>

            {selectedCourse.chapters && selectedCourse.chapters[0].isFree && (
              <div className="mt-4">
                <Button>Download First Chapter</Button>
              </div>
            )}

            <div className="mt-4 flex justify-end">
              <Button onClick={closeModal}>Close</Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
