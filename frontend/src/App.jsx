import { Routes, Route, useLocation } from "react-router-dom";

// Components
import Topbar from "./scenes/global/Topbar";
import MyAccount from "./scenes/myaccount";
import LandingPage from "./components/LandingPage";
import NotFound from "./components/NotFound";
import Cart from "./scenes/Cart";
import CupcakesPage from "./pages/CupcakesPage";
import BrowniesPage from "./pages/BrowniesPage";
import GummiesPage from "./pages/GummiesPage";
import CrispiesPage from "./pages/CrispiesPage";

function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isLandingPage ? "bg-transparent" : "bg-white text-gray-900"
      }`}
    >
      {/* Top Navigation */}
      <Topbar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/cupcakes" element={<CupcakesPage />} />
          <Route path="/brownies" element={<BrowniesPage />} />
          <Route path="/gummies" element={<GummiesPage />} />
          <Route path="/crispies" element={<CrispiesPage />} />
          /</Routes>
      </main>
    </div>
  );
}

export default App;
