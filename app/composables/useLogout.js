export const useLogout = () => {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigateTo("/login");
  };

  return { logout };
};
