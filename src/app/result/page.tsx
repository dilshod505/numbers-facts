import { notFound } from "next/navigation";

// API dan fact olish funksiyasi
async function getNumberFact() {
  const url = `http://numbersapi.com/random/trivia`; // Misol uchun doimiy URL
  try {
    const res = await fetch(url);
    const text = await res.text();
    return text;
  } catch {
    return null;
  }
}

// Sahifa komponenti (searchParams yo'q)
export default async function ResultPage() {
  const fact = await getNumberFact();

  if (!fact) return notFound();

  return (
    <main className="max-w-xl mx-auto mt-10 p-4 border rounded">
      <h1 className="text-2xl font-bold mb-4">Результат</h1>

      <p className="mt-4 d">Факт: {fact}</p>
    </main>
  );
}
