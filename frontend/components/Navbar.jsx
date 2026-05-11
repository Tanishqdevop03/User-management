const Navbar = () => {
  return (
    <div className="bg-white flex items-center justify-end px-4 md:px-8 py-4 shadow-sm">
      <div className="text-right">
        <h2 className="font-semibold text-sm md:text-base">Admin</h2>
        <p className="text-xs md:text-sm text-gray-500">Workspace Owner</p>
      </div>
    </div>
  );
};

export default Navbar;
