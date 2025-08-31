// Simple authentication utility
export const checkCredentials = (username, password) => {
  const demoUsername = process.env.DEMO_USERNAME || "chaicode";
  const demoPassword = process.env.DEMO_PASSWORD || "ilovetea";

  return username === demoUsername && password === demoPassword;
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("vizora-auth") === "true";
};

export const login = (username, password) => {
  if (checkCredentials(username, password)) {
    localStorage.setItem("vizora-auth", "true");
    localStorage.setItem("vizora-username", username);
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem("vizora-auth");
  localStorage.removeItem("vizora-username");
};

export const getCurrentUser = () => {
  if (typeof window === "undefined") return null;
  const username = localStorage.getItem("vizora-username");
  return username ? { username } : null;
};
