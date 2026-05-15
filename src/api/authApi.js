const BASE_URL = "http://localhost:8080/api/auth";

/* REGISTER */
export const registerUser = async ({ name, email, password }) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
};

/* LOGIN */
export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.text();
};



export const changePassword = async ({
  email,
  currentPassword,
  newPassword,
}) => {
  const response = await fetch(
    `${BASE_URL}/change-password?email=${email}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    }
  );

  // ✅ SUCCESS
  if (response.ok) {
    return response.text();
  }

  // ✅ ERROR (parse JSON properly)
  const errorData = await response.json();
  throw new Error(errorData.message);
};



/* UPDATE LOGIN USER (NAME & EMAIL) */
export const updateUserProfile = async ({ currentEmail, name, email }) => {
  const response = await fetch(
    `${BASE_URL}/update-profile?email=${currentEmail}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    }
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to update profile");
  }

  return response.json();
};
