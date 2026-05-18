import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET() {
  const reservations =
    await prisma.reservation.findMany();

  return NextResponse.json(
    reservations
  );
}
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const reservation =
      await prisma.reservation.create({
        data: {
          name: body.name,
          course: body.course,
          date: body.date,
          time: body.time,
        },
      });

    return NextResponse.json(reservation);
  } catch (error: any) {
    console.log(error);

    if (error.code === "P2002") {
      return NextResponse.json(
        {
          error:
            "この時間は予約済みです",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        error: "予約失敗",
      },
      {
        status: 500,
      }
    );
  }
}