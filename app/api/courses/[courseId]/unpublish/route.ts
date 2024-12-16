import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string; chapterId: string } }
) {
    try {
        const { userId }: { userId: string | null } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.findUnique({
            where: {
              id: params.courseId,
              userId,
            },
        });
      
        if(!course) {
            return new NextResponse("Chapter not found", { status: 404 });
        }

        const unpublishedCourse = await db.course.update({
            where: {
                id: params.courseId,
                userId,
            },
            data: {
                isPublished: false,
            }
        });

        return NextResponse.json(unpublishedCourse);
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}