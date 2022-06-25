import client from "./client";

export const createUser = async (userInfo) => {
  try {
    const { data } = await client.post("/create", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const verifyEmail = async ({ OTP, userId }) => {
  try {
    const data = await client.post("/verify-email", { OTP, userId });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};
export const signInUser = async (userInfo) => {
  try {
    const data = await client.post("/sign-in", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};
