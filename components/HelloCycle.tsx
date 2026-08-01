"use client";

import { useEffect, useRef, useState } from "react";

const GREETINGS = [
  "hello",
  "नमस्ते",
  "안녕하세요",
  "olá",
  "hola",
  "bonjour",
  "ciao",
  "hello",
];

const FADE = 500;
const HOLD = 1500;

export function HelloCycle() {
  const ref = useRef<HTMLSpanElement>(null);
  const [word, setWord] = useState(GREETINGS[0]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        let i = 1;
        const step = () => {
          node.style.opacity = "0";
          timer = setTimeout(() => {
            setWord(GREETINGS[i]);
            node.style.opacity = "1";
            i += 1;
            if (i < GREETINGS.length) timer = setTimeout(step, HOLD);
          }, FADE);
        };

        timer = setTimeout(step, 700);
      },
      { threshold: 0.6 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <span className="sr-only">hello</span>
      <span ref={ref} aria-hidden="true" className="hello-word">
        {word}
      </span>
    </>
  );
}
