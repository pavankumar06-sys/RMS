import { useState, useEffect } from "react";
import { changePassword } from "../api/authApi";
import MessageModal from "../components/MessageModal";
import { getAdminInfo, updateAdminInfo } from "../api/adminInfoApi";
import { updateUserProfile } from "../api/authApi";


import ProfileAvatar from "../components/ProfileAvatar";

export default function AdminInfo() {
  /* -----------------------------------
     TAB STATE
  ----------------------------------- */
  const [activeTab, setActiveTab] = useState("info");

  /* -----------------------------------
     ADMIN INFO STATE (ALL EDITABLE)
  ----------------------------------- */
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    role: "Admin",
    position: "",
    company: "",
    website: "",
    phone: "",
    address: "",
  });

  const loadAdminInfo = async () => {
  try {
    const data = await getAdminInfo();
    if (!data) return;

    setAdminInfo((prev) => ({
      ...prev,
      role: data.adminRole || "",
      position: data.position || "",
      company: data.companyName || "",
      website: data.website || "",
      phone: data.phone || "",
      address: data.address || "",
    }));
  } catch {
    console.warn("No admin info found");
  }
};


  /* -----------------------------------
     PASSWORD STATE
  ----------------------------------- */
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});


  //===============
  const [modal, setModal] = useState({
  open: false,
  type: "success",
  title: "",
  message: "",
});

  /* -----------------------------------
     POPULATE FROM SIDEBAR / LOGIN DATA
  ----------------------------------- */

//   useEffect(() => {
//   const storedName = localStorage.getItem("userName");
//   const storedEmail = localStorage.getItem("userEmail");

//   setAdminInfo((prev) => ({
//     ...prev,
//     name: storedName || "",
//     email: storedEmail || "",
//   }));

//   // ✅ FETCH ADMIN INFO FROM BACKEND
//   getAdminInfo()
//     .then((data) => {
//       if (!data) return;

//       setAdminInfo((prev) => ({
//         ...prev,
//         role: data.adminRole || "",
//         position: data.position || "",
//         company: data.companyName || "",
//         website: data.website || "",
//         phone: data.phone || "",
//         address: data.address || "",
//       }));
//     })
//     .catch(() => {
//       console.warn("Admin info not found yet");
//     });
// }, []);
//===================================================
  
  useEffect(() => {
  const storedName = localStorage.getItem("userName");
  const storedEmail = localStorage.getItem("userEmail");

  setAdminInfo((prev) => ({
    ...prev,
    name: storedName || "",
    email: storedEmail || "",
  }));

  // ✅ Load admin info from backend
  loadAdminInfo();
}, []);

  const validatePasswordForm = () => {
  let valid = true;
  let newErrors = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  if (!passwordData.currentPassword) {
    newErrors.currentPassword = "Current password is required";
    valid = false;
  }

  if (!passwordData.newPassword) {
    newErrors.newPassword = "New password is required";
    valid = false;
  }

  if (!passwordData.confirmPassword) {
    newErrors.confirmPassword = "Confirm password is required";
    valid = false;
  }

  if (
    passwordData.newPassword &&
    passwordData.confirmPassword &&
    passwordData.newPassword !== passwordData.confirmPassword
  ) {
    newErrors.confirmPassword = "Passwords do not match";
    valid = false;
  }

  setErrors(newErrors);
  return valid;
};

  /* -----------------------------------
     HANDLERS
  ----------------------------------- */
  const handleInfoChange = (field, value) => {
    setAdminInfo({ ...adminInfo, [field]: value });
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData({ ...passwordData, [field]: value });
  };




// const handleInfoSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     await updateAdminInfo(adminInfo);

//     setModal({
//       open: true,
//       type: "success",
//       title: "Admin Info Updated",
//       message: "Admin information updated successfully.",
//     });
//   } catch (err) {
//     setModal({
//       open: true,
//       type: "error",
//       title: "Update Failed",
//       message: err.message || "Unable to update admin info",
//     });
//   }
// };

const handleInfoSubmit = async (e) => {
  e.preventDefault();

  const currentEmail = localStorage.getItem("userEmail");

  try {
    /* 1️⃣ UPDATE LOGIN USER (NAME & EMAIL) */
    await updateUserProfile({
      currentEmail,
      name: adminInfo.name,
      email: adminInfo.email,
    });

    /* 2️⃣ UPDATE ADMIN / ORGANIZATION INFO */
    await updateAdminInfo(adminInfo);

    /* 3️⃣ UPDATE LOCAL STORAGE (UI SYNC) */
    localStorage.setItem("userName", adminInfo.name);
    localStorage.setItem("userEmail", adminInfo.email);

    /* 4️⃣ REFRESH ADMIN INFO FROM BACKEND */
    await loadAdminInfo();

    setModal({
      open: true,
      type: "success",
      title: "Admin Info Updated",
      message: "Admin information updated successfully.",
    });
  } catch (err) {
    setModal({
      open: true,
      type: "error",
      title: "Update Failed",
      message: err.message || "Unable to update admin info",
    });
  }
};


const handlePasswordSubmit = async (e) => {
  e.preventDefault();

  // ✅ Frontend validation
  if (!validatePasswordForm()) return;

  const email = localStorage.getItem("userEmail");
  if (!email) {
    setModal({
      open: true,
      type: "error",
      title: "Session Error",
      message: "User session expired. Please login again.",
    });
    return;
  }

  try {
    await changePassword({
      email,
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    });

    setModal({
      open: true,
      type: "success",
      title: "Password Updated",
      message: "Your password has been updated successfully.",
    });

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setErrors({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  } catch (err) {
    // ✅ Backend wrong password case
    setErrors({
      ...errors,
      currentPassword: "Current password is incorrect",
    });

    setModal({
      open: true,
      type: "error",
      title: "Update Failed",
      message: err.message || "Unable to update password.",
    });
  }
};

  return (
    // <div className="p-6 max-w-4xl space-y-6">
    //   {/* HEADER */}
    //   <div>
    //     <h1 className="text-2xl font-semibold">Admin Settings</h1>
    //     <p className="text-gray-500">
    //       Manage admin profile information and security
    //     </p>
    //   </div>
    //   <ProfileAvatar />

    //   {/* TABS */}
    //   <div className="flex gap-4 border-b">
    //     <button
    //       onClick={() => setActiveTab("info")}
    //       className={`pb-2 text-sm font-medium ${
    //         activeTab === "info"
    //           ? "border-b-2 border-blue-600 text-blue-600"
    //           : "text-gray-500"
    //       }`}
    //     >
    //       Admin Information
    //     </button>

    //     <button
    //       onClick={() => setActiveTab("password")}
    //       className={`pb-2 text-sm font-medium ${
    //         activeTab === "password"
    //           ? "border-b-2 border-blue-600 text-blue-600"
    //           : "text-gray-500"
    //       }`}
    //     >
    //       Update Password
    //     </button>
    //   </div>

    //   {/* ===============================
    //      TAB 1 : ADMIN INFO
    //   ================================ */}
    //   {activeTab === "info" && (
    //     <form
    //       onSubmit={handleInfoSubmit}
    //       className="bg-white border rounded-lg p-6 space-y-4"
    //     >
    //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
    //         <Input
    //         label="Admin Name"
    //         value={adminInfo.name}
    //         onChange={(e) => handleInfoChange("name", e.target.value)}
    //         />

    //         <Input
    //         label="Admin Email"
    //         type="email"
    //         value={adminInfo.email}
    //         onChange={(e) => handleInfoChange("email", e.target.value)}
    //         />


    //         <Input
    //           label="Admin Role"
    //           value={adminInfo.role}
    //           onChange={(e) => handleInfoChange("role", e.target.value)}
    //         />

    //         <Input
    //           label="Admin Position / Title"
    //           value={adminInfo.position}
    //           onChange={(e) => handleInfoChange("position", e.target.value)}
    //         />

    //         <Input
    //           label="Company Name"
    //           value={adminInfo.company}
    //           onChange={(e) => handleInfoChange("company", e.target.value)}
    //         />

    //         <Input
    //           label="Website"
    //           value={adminInfo.website}
    //           onChange={(e) => handleInfoChange("website", e.target.value)}
    //         />

    //         <Input
    //           label="Phone"
    //           value={adminInfo.phone}
    //           onChange={(e) => handleInfoChange("phone", e.target.value)}
    //         />
    //       </div>

    //       <div>
    //         <label className="text-sm text-gray-600">Office Address</label>
    //         <textarea
    //           rows={3}
    //           value={adminInfo.address}
    //           onChange={(e) =>
    //             handleInfoChange("address", e.target.value)
    //           }
    //           className="w-full mt-1 px-3 py-2 border rounded-lg"
    //         />
    //       </div>

    //       <button
    //         type="submit"
    //         className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    //       >
    //         Save Changes
    //       </button>
    //     </form>
    //   )}

    //   {/* ===============================
    //      TAB 2 : PASSWORD UPDATE
    //   ================================ */}
    //   {activeTab === "password" && (
    //     <form
    //       onSubmit={handlePasswordSubmit}
    //       className="bg-white border rounded-lg p-6 space-y-4"
    //     >
    //       <Input
    //         label="Current Password"
    //         type="password"
    //         value={passwordData.currentPassword}
    //         onChange={(e) => {
    //             handlePasswordChange("currentPassword", e.target.value);
    //             setErrors({ ...errors, currentPassword: "" });
    //         }}
    //         error={errors.currentPassword}
    //         />


    //       <Input
    //         label="New Password"
    //         type="password"
    //         value={passwordData.newPassword}
    //         onChange={(e) => {
    //             handlePasswordChange("newPassword", e.target.value);
    //             setErrors({ ...errors, newPassword: "" });
    //         }}
    //         error={errors.newPassword}
    //         />

    //       <Input
    //         label="Confirm New Password"
    //         type="password"
    //         value={passwordData.confirmPassword}
    //         onChange={(e) => {
    //             handlePasswordChange("confirmPassword", e.target.value);
    //             setErrors({ ...errors, confirmPassword: "" });
    //         }}
    //         error={errors.confirmPassword}
    //         />

    //       <button
    //         type="submit"
    //         className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-red-700"
    //       >
    //         Update Password
    //       </button>
    //     </form>
    //   )}

    //   {/* <MessageModal
    //         open={modal.open}
    //         type={modal.type}
    //         title={modal.title}
    //         message={modal.message}
    //         onClose={() => setModal({ ...modal, open: false })}
    //         /> */}

    //         <MessageModal
    //         open={modal.open}
    //         type={modal.type}
    //         title={modal.title}
    //         message={modal.message}
    //         onClose={() => {
    //             setModal({ ...modal, open: false });

    //             // ✅ Reload page after OK click
    //             window.location.reload();
    //         }}
    //         />

    // </div>

    <div className="p-6 max-w-4xl space-y-6">
  {/* HEADER */}
  <div className="flex items-center justify-between">
    {/* LEFT SIDE */}
    <div>
      <h1 className="text-2xl font-semibold">Admin Settings</h1>
      <p className="text-gray-500">
        Manage admin profile information and security
      </p>
    </div>

    {/* RIGHT SIDE - PROFILE AVATAR */}
    <ProfileAvatar />
  </div>

  {/* TABS */}
  <div className="flex gap-4 border-b">
    <button
      onClick={() => setActiveTab("info")}
      className={`pb-2 text-sm font-medium ${
        activeTab === "info"
          ? "border-b-2 border-blue-600 text-blue-600"
          : "text-gray-500"
      }`}
    >
      Admin Information
    </button>

    <button
      onClick={() => setActiveTab("password")}
      className={`pb-2 text-sm font-medium ${
        activeTab === "password"
          ? "border-b-2 border-blue-600 text-blue-600"
          : "text-gray-500"
      }`}
    >
      Update Password
    </button>
  </div>

  {/* ===============================
     TAB 1 : ADMIN INFO
  ================================ */}
  {activeTab === "info" && (
    <form
      onSubmit={handleInfoSubmit}
      className="bg-white border rounded-lg p-6 space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Admin Name"
          value={adminInfo.name}
          onChange={(e) => handleInfoChange("name", e.target.value)}
        />

        <Input
          label="Admin Email"
          type="email"
          value={adminInfo.email}
          onChange={(e) => handleInfoChange("email", e.target.value)}
        />

        <Input
          label="Admin Role"
          value={adminInfo.role}
          onChange={(e) => handleInfoChange("role", e.target.value)}
        />

        <Input
          label="Admin Position / Title"
          value={adminInfo.position}
          onChange={(e) => handleInfoChange("position", e.target.value)}
        />

        <Input
          label="Company Name"
          value={adminInfo.company}
          onChange={(e) => handleInfoChange("company", e.target.value)}
        />

        <Input
          label="Website"
          value={adminInfo.website}
          onChange={(e) => handleInfoChange("website", e.target.value)}
        />

        <Input
          label="Phone"
          value={adminInfo.phone}
          onChange={(e) => handleInfoChange("phone", e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">Office Address</label>
        <textarea
          rows={3}
          value={adminInfo.address}
          onChange={(e) =>
            handleInfoChange("address", e.target.value)
          }
          className="w-full mt-1 px-3 py-2 border rounded-lg"
        />
      </div>

      <button
        type="submit"
        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Save Changes
      </button>
    </form>
  )}

  {/* ===============================
     TAB 2 : PASSWORD UPDATE
  ================================ */}
  {activeTab === "password" && (
    <form
      onSubmit={handlePasswordSubmit}
      className="bg-white border rounded-lg p-6 space-y-4"
    >
      <Input
        label="Current Password"
        type="password"
        value={passwordData.currentPassword}
        onChange={(e) => {
          handlePasswordChange("currentPassword", e.target.value);
          setErrors({ ...errors, currentPassword: "" });
        }}
        error={errors.currentPassword}
      />

      <Input
        label="New Password"
        type="password"
        value={passwordData.newPassword}
        onChange={(e) => {
          handlePasswordChange("newPassword", e.target.value);
          setErrors({ ...errors, newPassword: "" });
        }}
        error={errors.newPassword}
      />

      <Input
        label="Confirm New Password"
        type="password"
        value={passwordData.confirmPassword}
        onChange={(e) => {
          handlePasswordChange("confirmPassword", e.target.value);
          setErrors({ ...errors, confirmPassword: "" });
        }}
        error={errors.confirmPassword}
      />

      <button
        type="submit"
        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-red-700"
      >
        Update Password
      </button>
    </form>
  )}

  <MessageModal
    open={modal.open}
    type={modal.type}
    title={modal.title}
    message={modal.message}
    onClose={() => {
      setModal({ ...modal, open: false });
      window.location.reload();
    }}
  />
</div>
  );
}


/* -----------------------------------
   REUSABLE INPUT COMPONENT
----------------------------------- */
// function Input({ label, type = "text", value, onChange }) {
//   return (
//     <div>
//       <label className="text-sm text-gray-600">{label}</label>
//       <input
//         type={type}
//         value={value}
//         onChange={onChange}
//         className="w-full mt-1 px-3 py-2 border rounded-lg"
//       />
//     </div>
//   );
// }

function Input({ label, type = "text", value, onChange, error }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full mt-1 px-3 py-2 border rounded-lg ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
}