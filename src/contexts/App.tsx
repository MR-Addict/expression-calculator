"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { examples } from "@/data/examples";
import { URLParams } from "@/lib/lib/URLParams";
import { ParseResultType } from "@/lib/parser/type";
import { expressionCalculator } from "@/lib/parser";

const expParams = new URLParams("exp", examples[0]);
const defaultExpression = { source: expParams.value, result: { res: 0, errors: [], tokens: [] } };

interface AppContextProps {
  expression: { source: string; result: ParseResultType };
  setExpression: (value: string) => void;
}

const AppContext = createContext<AppContextProps>({
  expression: defaultExpression,
  setExpression: () => {}
});

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [expression, setExpression] = useState<{ source: string; result: ParseResultType }>(defaultExpression);

  useEffect(() => {
    const callback = () => {
      expParams.value = expression.source;
      setExpression((prev) => ({ ...prev, result: expressionCalculator(expression.source) }));
    };
    const timer = setTimeout(callback, 100);
    return () => clearTimeout(timer);
  }, [expression.source]);

  return (
    <AppContext.Provider
      value={{
        expression,
        setExpression: (value: string) => setExpression((prev) => ({ source: value, result: prev.result }))
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
