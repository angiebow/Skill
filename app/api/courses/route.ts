import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { userId }: { userId: string | null } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Ambil kursus berdasarkan userId yang sedang login
        const courses = await db.course.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(courses);
    } catch (error) {
        console.log("[COURSES GET]", error);
        return new NextResponse("Error fetching courses", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { userId }: { userId: string | null } = await auth();
        const { title } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.create({
            data: {
                userId,
                title,
            },
        });

        return NextResponse.json(course);
    } catch (error) {
        console.log("[COURSES POST]", error);
        return new NextResponse("Error creating course", { status: 500 });
    }
}
