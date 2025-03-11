import clsx from "clsx";
import { useEffect, useState } from "react";

import style from "./home.module.css";

import { expressionParse } from "@/lib/parser";
import { ParseResultType } from "@/lib/parser/type";

export default function Home() {
  const [expression, setExpresion] = useState("( 1.1 + 2.2 ) * 3.3 - 4.4 * ( 5 / 6 )");
  const [result, setResult] = useState<ParseResultType>(expressionParse(expression));

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setExpresion(e.target.value);
  }

  useEffect(() => {
    const callback = () => setResult(expressionParse(expression));
    const timer = setTimeout(callback, 100);
    return () => clearTimeout(timer);
  }, [expression]);

  return (
    <section aria-label="Home" className={style.wrapper}>
      <textarea
        value={expression}
        onChange={handleChange}
        className={clsx(style.container, style.input)}
        placeholder="Input raw expression here..."
      />

      <div className={style.container}>
        <h2>Expression result:</h2>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </section>
  );
}
