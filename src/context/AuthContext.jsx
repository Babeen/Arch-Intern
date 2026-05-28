import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const login = (data) => setUser(data);

  const signup = (data) => setUser(data);

  const logout = () => setUser(null);

  const updateUser = (data) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  const changePassword = (currentPassword, newPassword) => {
    if (user?.password && user.password !== currentPassword) {
      return { success: false, message: "Current password is incorrect" };
    }
    setUser((prev) => ({ ...prev, password: newPassword }));
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
