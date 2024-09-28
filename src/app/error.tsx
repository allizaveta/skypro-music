"use client";

import { useEffect } from "react";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Что-то пошло не такк</h2>
      <button onClick={() => reset()}>Попробовать снова</button>
    </div>
  );
}
