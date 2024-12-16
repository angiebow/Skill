"use client"; // Add this at the top

import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  createdAt: string;
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("/api/courses"); // Ganti dengan endpoint yang sesuai
      const data = await response.json();
      setCourses(data);
    };

    fetchCourses();
  }, []);

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
            <p className="text-sm text-gray-500">Created: {new Date(course.createdAt).toLocaleDateString()}</p>
            <Link href={`/courses/${course.id}`}>
              <Button className="mt-4">View Course</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
