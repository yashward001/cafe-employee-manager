import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const { pathname } = useLocation();
  const isActive = (p: string) =>
    pathname === p ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-200";

  return (
    <header className="bg-white border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold text-lg">☕ Cafe Employee Dashboard</Link>
        <nav className="flex gap-2">
          <Link className={`px-3 py-1.5 rounded-md ${isActive("/")}`} to="/">Home</Link>
          <Link className={`px-3 py-1.5 rounded-md ${isActive("/cafes")}`} to="/cafes">Cafes</Link>
          <Link className={`px-3 py-1.5 rounded-md ${isActive("/employees")}`} to="/employees">Employees</Link>
        </nav>
      </div>
    </header>
  );
};