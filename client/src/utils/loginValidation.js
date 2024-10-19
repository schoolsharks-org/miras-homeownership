export const loginValidation = (email, name) => {
  if (name.trim() === "") {
    return { success: false, error: "Name is required" };
  }
  if (email.trim() != "") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return { success: false, error: "Email must be valid" };
    }
  }


  return { success: true, error: null };
};