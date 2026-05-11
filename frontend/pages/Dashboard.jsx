import { useState, useEffect } from "react";
import { Users, UserCheck, UserX, Shield } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/axios";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      const { data } = await API.get("/users/getuser");
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { getUsers(); }, []);

  const stats = [
    { label: "Total Users", value: users.length, icon: <Users size={22} />, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Active Users", value: users.filter((u) => u.status === "Active").length, icon: <UserCheck size={22} />, color: "text-green-600", bg: "bg-green-50" },
    { label: "Inactive Users", value: users.filter((u) => u.status === "Inactive").length, icon: <UserX size={22} />, color: "text-red-500", bg: "bg-red-50" },
    { label: "Admins", value: users.filter((u) => u.role === "Admin").length, icon: <Shield size={22} />, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="flex bg-[#f5f7fb] min-h-screen">
      <Sidebar />

      <div className="w-full md:ml-[260px]">
        <Navbar />

        <div className="p-4 md:p-8 pt-16 md:pt-8">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Good Morning 👋</h1>
            <p className="text-gray-400 text-sm md:text-base">Here's what's happening today.</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white p-5 rounded-2xl shadow-sm animate-pulse">
                  <div className="h-3 bg-gray-200 rounded w-20 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-12"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white p-4 md:p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <p className="text-gray-400 text-xs md:text-sm font-medium">{stat.label}</p>
                    <div className={`${stat.bg} ${stat.color} p-1.5 md:p-2 rounded-lg`}>
                      {stat.icon}
                    </div>
                  </div>
                  <h1 className={`text-3xl md:text-4xl font-bold ${stat.color}`}>{stat.value}</h1>
                </div>
              ))}
            </div>
          )}

          {!loading && users.length === 0 && (
            <div className="bg-white rounded-2xl p-10 text-center mt-8">
              <Users size={40} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-400 text-sm">No users found. Add your first user to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
