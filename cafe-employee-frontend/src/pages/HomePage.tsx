import { Link } from "react-router-dom";

export const HomePage = () => (
  <div className="text-center py-20">
    <h1 className="text-4xl font-bold mb-4 text-gray-800">
      ☕ Cafe Employee Dashboard
    </h1>
    <p className="text-gray-600 mb-8">
      Manage cafes and employees connected to your Node + Prisma backend.
    </p>
    <div className="flex justify-center gap-4">
      <Link
        to="/cafes"
        className="rounded bg-gray-900 text-white px-5 py-2 hover:bg-black"
      >
        View Cafes
      </Link>
      <Link
        to="/employees"
        className="rounded bg-blue-600 text-white px-5 py-2 hover:bg-blue-700"
      >
        View Employees
      </Link>
    </div>
  </div>
);

