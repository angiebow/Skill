import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    console.log("ROUTE ACCESSED")
    const paramsValue = await params;
    const { userId }: { userId: string | null } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { list } = await req.json();

    const courseOwner = await db.course.findUnique({
        where: {
            id: paramsValue.courseId,
            userId: userId
        }
    });

    if (!courseOwner) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    for (let item of list) {
        console.log(item)
        await db.chapter.update({
            where: { id: item.id },
            data: { position: item.position },
        });
    }

    console.log("Chapters reordered");
    return new NextResponse("success", { status: 200 });
  } catch (error) {
    console.log("[REORDER]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}