import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/ssr';
import { KeycloakInstance } from 'keycloak-js';

type AuthContextProps = {
  isAuthenticated: boolean;
  role: string | null;
  departamento: number | null;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { initialized, keycloak } = useKeycloak<KeycloakInstance>();

  const authData: AuthContextProps = {
    isAuthenticated: (initialized && keycloak?.authenticated) ?? false,
    role: initialized ? (keycloak?.idTokenParsed as any)?.role ?? null : null,
    departamento: initialized ? (keycloak?.idTokenParsed as any)?.departamento[0].id ?? null : null,
  };

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
