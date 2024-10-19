const useLocalStorage = () => {
  const user = localStorage.getItem("user");
  const session = localStorage.getItem("session");
  return { user, session };
};

export default useLocalStorage;
