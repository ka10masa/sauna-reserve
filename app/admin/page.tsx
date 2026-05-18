import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const reservations =
    await prisma.reservation.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          管理画面
        </h1>

        <div className="space-y-4">
          {reservations.map(
            (reservation) => (
              <div
                key={reservation.id}
                className="border border-gray-700 p-4 rounded"
              >
                <p>
                  名前：
                  {reservation.name}
                </p>

                <p>
                  コース：
                  {
                    reservation.course
                  }
                </p>

                <p>
                  日付：
                  {reservation.date}
                </p>

                <p>
                  時間：
                  {reservation.time}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
}