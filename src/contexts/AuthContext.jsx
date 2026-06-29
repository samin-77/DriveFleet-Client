import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/api/auth/me')
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await axiosInstance.post('/api/auth/login', { email, password });
    setUser(res.data.user);
    return res.data;
  };

  const register = async (data) => {
    const res = await axiosInstance.post('/api/auth/signup', data);
    return res.data;
  };

  const googleLogin = async (data) => {
    const res = await axiosInstance.post('/api/auth/google', data);
    setUser(res.data.user);
    return res.data;
  };

  const logout = async () => {
    await axiosInstance.post('/api/auth/logout');
    setUser(null);
  };

  const value = { user, loading, login, register, googleLogin, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
