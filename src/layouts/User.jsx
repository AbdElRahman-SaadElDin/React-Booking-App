import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import SearchCard from "../components/SearchCard/SearchCard";
import { useCallback } from "react";

const User = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hotels, setHotels] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchResults = useCallback((results) => {
    setHotels(results);
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar - hidden on mobile, shown on desktop */}
      <div className="hidden lg:block">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={toggleSidebar}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden">
          <div className="fixed top-0 left-0 h-full z-50">
            <Sidebar
              isCollapsed={false}
              onToggleCollapse={toggleMobileMenu}
              isMobile={true}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        <Navbar onMobileMenuToggle={toggleMobileMenu} />
        <div className="relative -mt-8 z-20 px-4 sm:px-6">
          <SearchCard onSearch={handleSearchResults} />
        </div>
        <main className="flex-1 overflow-auto">
          <Outlet context={{ hotels, setHotels }} />
        </main>
      </div>
    </div>
  );
};

export default User;
