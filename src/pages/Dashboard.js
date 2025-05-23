import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const tiles = [
    { title: "Chatbot", path: "/chatbot", description: "Interactive chatbot module" },
    { title: "Image Data Extraction", path: "/image-data-extraction", description: "Extract data from images" },
    { title: "Image + Text Extraction", path: "/image-text-extraction", description: "Extract image and text input" },
    { title: "Workflow Generator", path: "/workflow-generator", description: "Create custom workflows" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {sidebarOpen && <Sidebar />}
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Header toggleSidebar={toggleSidebar} />
        <main style={{ padding: 20, overflowY: "auto" }}>
          <h1>Dashboard</h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
            {tiles.map((tile) => (
              <div
                key={tile.title}
                onClick={() => navigate(tile.path)}
                style={{
                  cursor: "pointer",
                  flex: "1 1 200px",
                  minWidth: 200,
                  background: "#1976d2",
                  color: "white",
                  borderRadius: 8,
                  padding: 20,
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s",
                  userSelect: "none"
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              >
                <h3>{tile.title}</h3>
                <p>{tile.description}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
