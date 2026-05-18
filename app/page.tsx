"use client";

import {
  useEffect,
  useState,
} from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [course, setCourse] =
    useState("60分コース");
  const [date, setDate] = useState("");
  const [time, setTime] =
    useState("10:00");
  const [loading, setLoading] =
    useState(false);

  const [
    reservedTimes,
    setReservedTimes,
  ] = useState<string[]>([]);

  useEffect(() => {
    const fetchReservations =
      async () => {
        if (!date) return;

        const res = await fetch(
          "/api/reserve"
        );

        const data = await res.json();

        const reserved = data
          .filter(
            (item: any) =>
              item.date === date
          )
          .map(
            (item: any) => item.time
          );

        setReservedTimes(reserved);
      };

    fetchReservations();
  }, [date]);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(
        "/api/reserve",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            course,
            date,
            time,
          }),
        }
      );

      if (!res.ok) {
        const data =
          await res.json();

        alert(data.error);

        setLoading(false);

        return;
      }

      alert("予約完了！");

      setName("");
      setCourse("60分コース");
      setDate("");
      setTime("10:00");
    } catch (error) {
      console.log(error);

      alert(
        "エラーが発生しました"
      );
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          プライベートサウナ予約
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block mb-2">
              お名前
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              className="w-full p-3 rounded bg-gray-800 border border-gray-700"
              placeholder="山田 太郎"
              required
            />
          </div>

          <div>
            <label className="block mb-2">
              コース選択
            </label>

            <select
              value={course}
              onChange={(e) =>
                setCourse(
                  e.target.value
                )
              }
              className="w-full p-3 rounded bg-gray-800 border border-gray-700"
            >
              <option>
                60分コース
              </option>
              <option>
                90分コース
              </option>
              <option>
                120分コース
              </option>
            </select>
          </div>

          <div>
            <label className="block mb-2">
              日付
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(
                  e.target.value
                )
              }
              className="w-full p-3 rounded bg-gray-800 border border-gray-700"
              required
            />
          </div>

          <div>
            <label className="block mb-2">
              時間
            </label>

            <select
              value={time}
              onChange={(e) =>
                setTime(
                  e.target.value
                )
              }
              className="w-full p-3 rounded bg-gray-800 border border-gray-700"
            >
              {[
                "10:00",
                "12:00",
                "14:00",
                "16:00",
                "18:00",
              ].map((slot) => (
                <option
                  key={slot}
                  value={slot}
                  disabled={reservedTimes.includes(
                    slot
                  )}
                >
                  {reservedTimes.includes(
                    slot
                  )
                    ? `${slot}（予約済み）`
                    : slot}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black p-3 rounded font-bold hover:bg-gray-300 disabled:bg-gray-500"
          >
            {loading
              ? "予約中..."
              : "予約する"}
          </button>
        </form>
      </div>
    </main>
  );
}