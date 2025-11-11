import { BrowserRouter, useLocation } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Users, Home } from "lucide-react"; // 🟢 add this at the top

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <AppRouter />
      </motion.div>
    </AnimatePresence>
  );
};

export const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        {/* ✅ Header always visible */}
        <header className="bg-gray-900 text-white py-4 shadow-md">
          <div className="container mx-auto px-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-wide flex items-center gap-2">
              ☕ Cafe Employee Manager
            </h1>

            <nav className="flex gap-6 text-sm items-center">
  <a href="/" className="flex items-center gap-2 hover:text-blue-400 transition">
    <Home size={20} /> Home
  </a>
  <a href="/cafes" className="flex items-center gap-2 hover:text-blue-400 transition">
    <Coffee size={20} /> Cafes
  </a>
  <a href="/employees" className="flex items-center gap-2 hover:text-blue-400 transition">
    <Users size={20} /> Employees
  </a>
</nav>
          </div>
        </header>

        {/* ✅ Animated main area */}
        <main className="flex-1 container mx-auto px-6 py-10">
          <AnimatedRoutes />
        </main>

        {/* ✅ Footer */}
        <footer className="bg-gray-100 text-center py-4 text-gray-600 text-sm">
          Made with ❤️ by Yash
        </footer>

        {/* ✅ Toasts */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              fontSize: "15px",
              borderRadius: "10px",
              padding: "10px 15px",
            },
            success: {
              iconTheme: { primary: "#10B981", secondary: "white" },
            },
            error: { iconTheme: { primary: "#EF4444", secondary: "white" } },
          }}
        />
      </div>
    </BrowserRouter>
  );
};