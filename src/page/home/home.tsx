import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

import style from "./home.module.css";

import { examples } from "@/data/examples";
import { URLParams } from "@/lib/lib/URLParams";
import { expressionCalculator } from "@/lib/parser";
import { ParseResultType } from "@/lib/parser/type";

const expParams = new URLParams("exp", examples[0]);

export default function Home() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [expression, setExpresion] = useState(expParams.value);
  const [result, setResult] = useState<ParseResultType>(expressionCalculator(expression));

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setExpresion(e.target.value);
  }

  function fouceTextarea() {
    if (!textareaRef.current) return;
    textareaRef.current.focus();
    textareaRef.current.setSelectionRange(textareaRef.current.value.length, textareaRef.current.value.length);
  }

  function handleSetExample(example: string) {
    setExpresion(example);
    setTimeout(fouceTextarea, 0);
  }

  useEffect(() => {
    const callback = () => {
      expParams.value = expression;
      setResult(expressionCalculator(expression));
    };
    const timer = setTimeout(callback, 100);
    return () => clearTimeout(timer);
  }, [expression]);

  useEffect(() => {
    fouceTextarea();
    setExpresion(expParams.value);
  }, []);

  return (
    <section aria-label="Home" className={style.wrapper}>
      <div className="flex flex-col gap-4">
        <div className={style.section}>
          <h1 className={style.title}>Examples</h1>
          <ul className={clsx(style.examples, style.container)}>
            {examples.map((exp) => (
              <li key={exp}>
                <button type="button" onClick={() => handleSetExample(exp)}>
                  {exp}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={style.section}>
          <h1 className={style.title}>Expression</h1>
          <textarea
            ref={textareaRef}
            value={expression}
            onChange={handleChange}
            className={clsx(style.container, style.input)}
            placeholder="Input raw expression here..."
          />
        </div>
      </div>

      <div className={clsx(style.result, style.section)}>
        <h2>Result</h2>
        <pre className={style.container}>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </section>
  );
}
