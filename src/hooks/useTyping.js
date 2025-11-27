import { useState, useEffect } from "react";

export const useTyping = (text, speed = 10) => {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    setTyped("");
    let index = 0;

    const interval = setInterval(() => {
      setTyped((prev) => prev + text[index]);
      index++;
      if (index === text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text]);

  return typed;
};
