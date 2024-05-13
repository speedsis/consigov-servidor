import { Servidor } from 'src/@types/servidor';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

interface ServidorState {
  currentServidor: Servidor | null;
  setCurrentServidor: (servidor: Servidor) => void;
}

export const useServidorState = createWithEqualityFn<ServidorState>(
  (set) => ({
    currentServidor: null,
    setCurrentServidor: (servidor) => set({ currentServidor: servidor }),
  }),
  shallow
);
