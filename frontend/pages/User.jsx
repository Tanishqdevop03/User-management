import { useEffect, useState } from "react";
import { Pencil, Trash2, X, UserPlus, Search } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/axios";

const EMPTY_FORM = { fullName: "", email: "", role: "Viewer", status: "Active", location: "", phone: "" };

const roleColors = {
  Admin: "bg-purple-100 text-purple-600",
  Editor: "bg-blue-100 text-blue-600",
  Manager: "bg-orange-100 text-orange-600",
  Viewer: "bg-gray-100 text-gray-600",
};

const statusColors = {
  Active: "bg-green-100 text-green-600",
  Inactive: "bg-red-100 text-red-500",
};

const Avatar = ({ name }) => {
  const initials = name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "?";
  const colors = ["bg-indigo-500", "bg-purple-500", "bg-pink-500", "bg-blue-500", "bg-teal-500"];
  const color = colors[name?.charCodeAt(0) % colors.length] || "bg-indigo-500";
  return (
    <div className={`w-9 h-9 rounded-full ${color} text-white flex items-center justify-center text-sm font-semibold shrink-0`}>
      {initials}
    </div>
  );
};

const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end md:items-center justify-center z-50 p-0 md:p-4">
    <div className="bg-white rounded-t-2xl md:rounded-2xl shadow-2xl w-full md:max-w-md p-6 md:p-8 relative max-h-[90vh] overflow-y-auto">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
        <X size={20} />
      </button>
      <h2 className="text-xl font-bold text-gray-800 mb-6">{title}</h2>
      {children}
    </div>
  </div>
);

const User = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  const getUsers = async () => {
    try {
      const { data } = await API.get("/users/getuser");
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { getUsers(); }, []);

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const openAdd = () => { setForm(EMPTY_FORM); setEditingUser(null); setShowModal(true); };
  const openEdit = (user) => {
    setForm({ fullName: user.fullName, email: user.email, role: user.role, status: user.status, location: user.location || "", phone: user.phone || "" });
    setEditingUser(user);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingUser) {
        await API.put(`/users/${editingUser._id}`, form);
      } else {
        await API.post("/users/signup", form);
      }
      setShowModal(false);
      getUsers();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/users/${deleteTarget._id}`);
      setDeleteTarget(null);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const filtered = users.filter((u) =>
    u.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filtered.slice(indexOfFirstUser, indexOfLastUser);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div className="flex bg-[#f5f7fb] min-h-screen">
      <Sidebar />

      <div className="w-full md:ml-65">
        <Navbar />

        <div className="p-4 md:p-8 pt-16 md:pt-8">

          {/* Header */}
          <div className="flex justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Users</h1>
              <p className="text-gray-400 mt-1 text-sm md:text-base">Manage and monitor your team members</p>
            </div>
            <button
              onClick={openAdd}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 md:px-5 md:py-3 rounded-xl font-medium transition shadow-md shadow-indigo-200 text-sm md:text-base shrink-0"
            >
              <UserPlus size={16} />
              <span className="hidden sm:inline">New User</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
            {[
              { label: "Total Users", value: users.length, color: "text-indigo-600", bg: "bg-indigo-50" },
              { label: "Active", value: users.filter((u) => u.status === "Active").length, color: "text-green-600", bg: "bg-green-50" },
              { label: "Inactive", value: users.filter((u) => u.status === "Inactive").length, color: "text-red-500", bg: "bg-red-50" },
              { label: "Admins", value: users.filter((u) => u.role === "Admin").length, color: "text-purple-600", bg: "bg-purple-50" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-4 md:p-5 shadow-sm">
                <p className="text-gray-400 text-xs md:text-sm">{stat.label}</p>
                <p className={`text-2xl md:text-3xl font-bold mt-1 md:mt-2 ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="relative mb-4 md:mb-5 w-full md:max-w-sm">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition text-sm"
            />
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr className="text-left text-sm text-gray-400 font-medium">
                  <th className="px-6 py-4">User</th>
                  <th className="px-4 py-4">Role</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Location</th>
                  <th className="px-4 py-4">Phone</th>
                  <th className="px-4 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-16 text-gray-400">No users found</td>
                  </tr>
                ) : (
                  currentUsers.map((user) => (
                    <tr key={user._id} className="border-t border-gray-50 hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={user.fullName} />
                          <div>
                            <p className="font-semibold text-gray-800">{user.fullName}</p>
                            <p className="text-sm text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${roleColors[user.role] || "bg-gray-100 text-gray-600"}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[user.status] || "bg-gray-100 text-gray-600"}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">{user.location || "—"}</td>
                      <td className="px-4 py-4 text-sm text-gray-500">{user.phone || "—"}</td>
                      <td className="px-4 py-4">
                        <div className="flex gap-3">
                          <button onClick={() => openEdit(user)} className="p-2 rounded-lg hover:bg-indigo-50 text-indigo-500 transition">
                            <Pencil size={16} />
                          </button>
                          <button onClick={() => setDeleteTarget(user)} className="p-2 rounded-lg hover:bg-red-50 text-red-400 transition">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden flex flex-col gap-3">
            {currentUsers.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center text-gray-400 text-sm">No users found</div>
            ) : (
              currentUsers.map((user) => (
                <div key={user._id} className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={user.fullName} />
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{user.fullName}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(user)} className="p-2 rounded-lg hover:bg-indigo-50 text-indigo-500 transition">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => setDeleteTarget(user)} className="p-2 rounded-lg hover:bg-red-50 text-red-400 transition">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className={`px-2.5 py-1 rounded-full font-medium ${roleColors[user.role] || "bg-gray-100 text-gray-600"}`}>{user.role}</span>
                    <span className={`px-2.5 py-1 rounded-full font-medium ${statusColors[user.status] || "bg-gray-100 text-gray-600"}`}>{user.status}</span>
                    {user.location && <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">{user.location}</span>}
                    {user.phone && <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">{user.phone}</span>}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition text-sm font-medium"
              >
                Previous
              </button>
              
              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
                      currentPage === i + 1
                        ? "bg-indigo-600 text-white"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition text-sm font-medium"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <Modal title={editingUser ? "Edit User" : "Add New User"} onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {[
              { label: "Full Name", name: "fullName", type: "text", placeholder: "John Doe" },
              { label: "Email", name: "email", type: "email", placeholder: "john@example.com" },
              { label: "Location", name: "location", type: "text", placeholder: "New York, USA" },
              { label: "Phone", name: "phone", type: "text", placeholder: "+1 234 567 8900" },
            ].map((field) => (
              <div key={field.name} className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={handleFormChange}
                  className="border border-gray-200 bg-gray-50 p-3 rounded-xl outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition text-sm"
                  required={field.name === "fullName" || field.name === "email"}
                />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Role</label>
                <select name="role" value={form.role} onChange={handleFormChange} className="border border-gray-200 bg-gray-50 p-3 rounded-xl outline-none focus:border-indigo-400 text-sm">
                  {["Admin", "Editor", "Manager", "Viewer"].map((r) => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Status</label>
                <select name="status" value={form.status} onChange={handleFormChange} className="border border-gray-200 bg-gray-50 p-3 rounded-xl outline-none focus:border-indigo-400 text-sm">
                  {["Active", "Inactive"].map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <button type="submit" disabled={loading} className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-60">
              {loading ? "Saving..." : editingUser ? "Save Changes" : "Add User"}
            </button>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <Modal title="Delete User" onClose={() => setDeleteTarget(null)}>
          <p className="text-gray-500 mb-6 text-sm md:text-base">
            Are you sure you want to delete <span className="font-semibold text-gray-800">{deleteTarget.fullName}</span>? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button onClick={() => setDeleteTarget(null)} className="flex-1 border border-gray-200 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition font-medium">
              Cancel
            </button>
            <button onClick={handleDelete} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition">
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default User;
