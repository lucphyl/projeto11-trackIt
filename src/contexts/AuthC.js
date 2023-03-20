import { createContext, useState } from "react";

const AuthCon = createContext();

export function AuthProvider({ children }) {
  const persistedAuth = JSON.parse(localStorage.getItem("auth"));
  const [auth, setAuth] = useState(persistedAuth);

  function login(authData) {
    setAuth(authData);
    localStorage.setItem("auth", JSON.stringify(authData));
  }

  return (
    <AuthCon.Provider value={{ auth, login }}>
      {children}
    </AuthCon.Provider>
  )
}

export default AuthCon;