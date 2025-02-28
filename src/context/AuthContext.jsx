import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try{
      const response = await axios.post("https://timemanagement-api.onrender.com/api/auth/login", { email, password });
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.error('Login failed:', error);
    }
    
  };

  const register = async (username, email, password) => {
    try{
      const response = await axios.post("https://timemanagement-api.onrender.com/api/auth/register", { username, email, password });
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);  
    } catch (error) {
      console.error('Registration failed:', error);
    }
    
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);