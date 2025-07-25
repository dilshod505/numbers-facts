import { notFound } from "next/navigation";

// API dan fact olish funksiyasi
async function getNumberFact({
  type,
  number,
  random,
}: {
  type?: string;
  number?: string;
  random?: string;
}) {
  if (!type) return null;

  const url =
    random === "true"
      ? `http://numbersapi.com/random/${type}`
      : `http://numbersapi.com/${number}/${type}`;

  try {
    const res = await fetch(url);
    const text = await res.text();
    return text;
  } catch {
    return null;
  }
}

// Asosiy sahifa komponenti
export default async function ResultPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Parametrlarni tozalab olish
  const type =
    typeof searchParams.type === "string" ? searchParams.type : undefined;
  const number =
    typeof searchParams.number === "string" ? searchParams.number : undefined;
  const random =
    typeof searchParams.random === "string" ? searchParams.random : undefined;

  const fact = await getNumberFact({ type, number, random });

  if (!fact) return notFound();

  return (
    <main className="max-w-xl mx-auto mt-10 p-4 border rounded">
      <h1 className="text-2xl font-bold mb-4">Результат</h1>
      <p>
        <strong>Тип:</strong> {type}
      </p>
      <p>
        <strong>Число:</strong> {random === "true" ? "Случайное" : number}
      </p>
      <p className="mt-4">
        <strong>Факт:</strong> {fact}
      </p>
    </main>
  );
}
