import axiosInstance from "../../api/axiosInstance";

interface LoginResponse {
  token: string;
}

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<string> => {
  try {
    const response = await axiosInstance.post<LoginResponse>("/auth/login", {
      email,
      password,
    });

    return response.data.token;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Login failed. Please try again.");
  }
};

const authService = {
  login,
};

export default authService;
