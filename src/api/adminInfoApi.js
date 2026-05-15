const BASE_URL = "http://localhost:8080/api/admin-info";

/* ✅ GET ADMIN INFO */
export const getAdminInfo = async () => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch admin info");
  }

  return response.json();
};

/* ✅ UPDATE ADMIN INFO */
export const updateAdminInfo = async (adminInfo) => {
  const response = await fetch(BASE_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      adminRole: adminInfo.role,
      position: adminInfo.position,
      companyName: adminInfo.company,
      website: adminInfo.website,
      phone: adminInfo.phone,
      address: adminInfo.address,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update admin info");
  }

  return response.json();
};