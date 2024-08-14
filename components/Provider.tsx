"use client";

import { createContext, useContext, useState } from "react";



type ContextType = {
  isSideMenuOpen: boolean
  setIsSideMenuOpen: (arg: boolean) => void,

};
const GloblaContext = createContext<ContextType>({
  isSideMenuOpen: false,
  setIsSideMenuOpen: () => {},
});


export default function GlobalProvider({ children }: {children: React.ReactNode}) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <GloblaContext.Provider value={{
      isSideMenuOpen,
      setIsSideMenuOpen
    }}>
      {children}
    </GloblaContext.Provider>
  );
}

export const useGlobalContex = () => {
  return useContext(GloblaContext);
}