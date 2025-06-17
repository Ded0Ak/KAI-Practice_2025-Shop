import { useEffect, useState } from 'react';

export default function useExchangeRate() {
  const [rate, setRate] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(res => res.json())
      .then(data => {
        if (data.rates && data.rates.UAH) {
          setRate(data.rates.UAH);
        }
      })
      .catch((err) => console.error("Помилка отримання курсу:", err));
  }, []);

  return rate;
}
