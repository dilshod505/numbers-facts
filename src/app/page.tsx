"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Select, Checkbox, Typography } from "antd";

const { Title, Text } = Typography;

export default function Home() {
  const [type, setType] = useState("trivia");
  const [number, setNumber] = useState("");
  const [useRandom, setUseRandom] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!useRandom && isNaN(Number(number))) {
      setError("Число должно быть в виде цифры");
      return;
    }

    setError("");
    const query = new URLSearchParams({
      type,
      ...(useRandom ? { random: "true" } : { number }),
    });

    router.push(`/result?${query.toString()}`);
  };

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
      <Title level={3}>Информация о числах</Title>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        <div>
          <Text strong>Тип:</Text>
          <Select
            value={type}
            onChange={(value) => setType(value)}
            style={{ width: "100%", marginTop: 8 }}
            options={[
              { value: "trivia", label: "Trivia" },
              { value: "math", label: "Math" },
              { value: "date", label: "Date" },
            ]}
          />
        </div>

        <div>
          <Checkbox
            checked={useRandom}
            onChange={(e) => setUseRandom(e.target.checked)}
          >
            Случайное число
          </Checkbox>
        </div>

        {!useRandom && (
          <div>
            <Text strong>Введите число:</Text>
            <Input
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Введите число"
            />
          </div>
        )}

        {error && <Text type="danger">{error}</Text>}

        <Button type="primary" htmlType="submit">
          Получить информацию
        </Button>
      </form>
    </main>
  );
}
