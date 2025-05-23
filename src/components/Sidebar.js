import React from "react";

const Sidebar = ({ isOpen }) => {
  // Mock bookmarks — replace with real data later
  const bookmarks = [
    { id: 1, title: "Search: React Auth" },
    { id: 2, title: "Note: Firebase Login" },
    { id: 3, title: "Result: Dashboard UI" }
  ];

  return (
    <aside
      style={{
        width: "220px",
        background: "#1976d2",
        color: "white",
        height: "100vh",
        padding: "20px",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100,
        transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.3s ease-in-out"
      }}
    >
      <h3 style={{ marginBottom: "20px", fontSize: "20px" }}>Menu</h3>
      <ul style={{ listStyle: "none", padding: 0, marginBottom: "20px" }}>
        <li style={menuItemStyle}>Dashboard</li>
        <li style={menuItemStyle}>Settings</li>
      </ul>

      <hr style={{ borderColor: "rgba(255,255,255,0.2)", margin: "20px 0" }} />

      <div>
        <h4 style={{ fontSize: "16px", marginBottom: "10px" }}>📌 Saved Bookmarks</h4>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {bookmarks.map((item) => (
            <li
              key={item.id}
              style={bookmarkItemStyle}
              title={item.title}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

// Inline styles as variables (for reuse)
const menuItemStyle = {
  margin: "10px 0",
  cursor: "pointer",
  fontSize: "16px",
  padding: "5px 0"
};

const bookmarkItemStyle = {
  marginBottom: "8px",
  fontSize: "14px",
  cursor: "pointer",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis"
};

export default Sidebar;
