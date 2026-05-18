export const metadata = {
  title: "プライベートサウナ予約サイト",
  description: "Sauna Reserve",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        style={{
          margin: 0,
          backgroundColor: "black",
          color: "white",
        }}
      >
        {children}
      </body>
    </html>
  );
}