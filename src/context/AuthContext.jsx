import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user') || localStorage.getItem('usuario');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.removeItem('usuario');
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (username, password) => {
    if (username.trim() !== '' && password.trim() !== '') {
      const userData = { username: username.trim(), role: 'Usuario Registrado' };
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}