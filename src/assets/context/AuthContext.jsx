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

    return storedUser
      ? JSON.parse(storedUser)
      : null;
  });

  // Save user
  useEffect(() => {
    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );
  }, [user]);

  // Login
  const login = (data) => {
    setUser(data);
  };

  // Logout
  const logout = () => {
    setUser(null);
  };

  // Update profile fields (name, email, etc.)
  const updateUser = (data) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  // Change password — since there's no real backend yet, we just
  // verify the current password matches what's stored and update it.
  const changePassword = (currentPassword, newPassword) => {
    if (user?.password && user.password !== currentPassword) {
      return { success: false, message: "Current password is incorrect" };
    }
    setUser((prev) => ({ ...prev, password: newPassword }));
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);