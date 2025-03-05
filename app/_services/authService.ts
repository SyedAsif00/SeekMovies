import axios from "@/app/_lib/axiosAuth";

const AuthService = {
  register: async (email: string, password: string) => {
    // Changed to direct "/register" (baseURL already has /api/auth)
    const { data } = await axios.post("/register", {
      email,
      password,
    });
    return data;
  },

  login: async (email: string, password: string) => {
    const { data } = await axios.post("/login", {
      email,
      password,
    });
    return data;
  },

  logout: async () => {
    await axios.post("/logout");
  },
};

export default AuthService;
