import { createContext, useContext, useState } from "react";

export const ExistingNotesStore = createContext<any>(null);

export const ExistingNotesStoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const state = {
    values: {},
    actions: {},
  };
  return (
    <ExistingNotesStore.Provider value={state}>
      {children}
    </ExistingNotesStore.Provider>
  );
};

export const useNotesContenxt = () => useContext(ExistingNotesStore);
