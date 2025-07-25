import { Button, Card, Typography } from "antd";
import Link from "next/link";
import { notFound } from "next/navigation";

const { Title, Paragraph, Text } = Typography;

type SearchParams = {
  type?: string;
  number?: string;
  random?: string;
};

async function getNumberFact({ type, number, random }: SearchParams) {
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

type PageProps = {
  searchParams: SearchParams;
};

export default async function ResultPage({ searchParams }: PageProps) {
  const { type, number, random } = searchParams;
  const fact = await getNumberFact({ type, number, random });

  if (!fact) return notFound();

  return (
    <main
      style={{
        maxWidth: 500,
        margin: "50px auto",
        padding: 24,
        border: "1px solid #ccc",
        borderRadius: 8,
      }}
    >
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
      <Link href="/">
        <Button type="primary" className="mt-3">
          Вернуться назад
        </Button>
      </Link>
    </main>
  );
}
