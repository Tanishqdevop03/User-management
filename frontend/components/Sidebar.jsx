import { LayoutDashboard, Users, LogOut, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleSignout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const menu = [
    { name: "Overview", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
    { name: "Users", icon: <Users size={20} />, path: "/users" },
  ];

  const SidebarContent = () => (
    <div className="w-65 h-screen bg-[#0f172a] text-white p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl font-bold">MyClickBook</h1>
          <button onClick={() => setOpen(false)} className="md:hidden text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {menu.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                location.pathname === item.path ? "bg-indigo-600" : "hover:bg-slate-800"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <button
        onClick={handleSignout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-slate-800 transition"
      >
        <LogOut size={20} />
        Sign Out
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#0f172a] text-white p-2 rounded-lg"
      >
        <Menu size={22} />
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div className={`md:hidden fixed top-0 left-0 z-50 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <SidebarContent />
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block fixed top-0 left-0 z-40">
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;
