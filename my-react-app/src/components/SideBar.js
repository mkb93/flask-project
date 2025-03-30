import React, { useState, useEffect } from 'react';
import '../styles/SideBar.css';

const Sidebar = ({ locations, selectedLocation, handleFilterByLocation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Check screen width on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsOpen(false); // Ensure sidebar is always open on desktop
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Show the toggle button ONLY on mobile */}
      {isMobile && (
        <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      )}

      {/* Sidebar: open by default on desktop, toggled on mobile */}
      <aside className={`sidebar ${isMobile && !isOpen ? "closed" : ""}`}>
        <h2>Filter By Location</h2>
        <ul>
          <li
            className={!selectedLocation ? "active" : ""}
            onClick={() => handleFilterByLocation("All")}
          >
            All Locations
          </li>
          {locations.map((loc) => (
            <li
              key={loc}
              className={selectedLocation === loc ? "active" : ""}
              onClick={() => handleFilterByLocation(loc)}
            >
              {loc}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
