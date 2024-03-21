import { Inter } from "next/font/google";

const latin = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-between p-24">
      <div className={`flex-grow text-center ${latin.className} text-6xl`}>
        前端监控平台
      </div>
    </main>
  );
}
