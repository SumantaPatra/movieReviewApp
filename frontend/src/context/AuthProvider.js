import React, { useState } from "react";
import { createContext } from "react";
import { signInUser } from "../api/auth";
export const AuthContext = createContext();
const defaultAuthInfo = {
  profile: null,
  isLoggedIn: true,
  isPending: false,
  error: "",
};
function AuthProvider({ children }) {
  const [authInfo, setAuthInfo] = useState({
    ...defaultAuthInfo,
  });

  const handleLogin = async (email, password) => {
    setAuthInfo({ ...authInfo, isPending: true });
    const { error, data } = await signInUser({ email, password });
    if (error) {
      return setAuthInfo({ ...authInfo, isPending: false, error });
    }
    const { user } = data;
    setAuthInfo({ profile: { ...user }, isPending: false, error: "" });
    localStorage.setItem("auth-token", user.token);
  };

  return (
    <AuthContext.Provider value={{ handleLogin, authInfo }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
