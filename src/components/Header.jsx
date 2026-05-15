

export default function Header() {
  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow">
      <h2 className="text-xl font-semibold">
        Welcome, {userName || "User"} 👋
      </h2>
      {/* <p className="text-sm text-gray-500">{userEmail}</p> */}
    </div>
  );
}
