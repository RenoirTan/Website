"use client";

import { createContext, useContext, useState } from "react";

type PageContextValue = {
  eotsPressed: boolean;
  setEotsPressed: (a: boolean) => void;
};

const PageContext = createContext<PageContextValue>({
  eotsPressed: false,
  setEotsPressed: (_) => {}
});

export function PageProvider({ children }: { children: React.ReactNode }) {
  const [eotsPressed, setEotsPressed] = useState(false);
  return (
    <PageContext.Provider value={{ eotsPressed, setEotsPressed }}>
      {children}
    </PageContext.Provider>
  )
}

export function usePageContext(): PageContextValue {
  return useContext(PageContext);
}