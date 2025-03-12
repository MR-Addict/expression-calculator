import clsx from "clsx";
import { useEffect, useRef } from "react";

import style from "./home.module.css";

import { examples } from "@/data/examples";
import { useAppContext } from "@/contexts/App";

export default function Home() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { expression, setExpression } = useAppContext();

  function handleSetExample(example: string) {
    fouceTextarea();
    setExpression(example);
  }

  function fouceTextarea() {
    if (!textareaRef.current) return;
    const length = textareaRef.current.value.length;
    textareaRef.current.focus();
    textareaRef.current.setSelectionRange(length, length);
  }

  useEffect(fouceTextarea, []);

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
            value={expression.source}
            onChange={(e) => setExpression(e.target.value)}
            className={clsx(style.container, style.input)}
            placeholder="Input raw expression here..."
          />
        </div>
      </div>

      <div className={clsx(style.result, style.section)}>
        <h2>Result</h2>
        <pre className={style.container}>
          {JSON.stringify({ res: expression.result.res, errors: expression.result.errors }, null, 2)}
        </pre>
      </div>
    </section>
  );
}
