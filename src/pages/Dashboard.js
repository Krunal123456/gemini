import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const tiles = [
    { title: "Chatbot", path: "/chatbot", description: "Interactive chatbot module" },
    { title: "Image Data Extraction", path: "/image-data-extraction", description: "Extract data from images" },
    { title: "Image + Text Extraction", path: "/image-text-extraction", description: "Extract image and text input" },
    { title: "Workflow Generator", path: "/workflow-generator", description: "Create custom workflows" },
  ];

  return (
    <div style={{ padding: 20, marginLeft: window.innerWidth > 768 ? "220px" : 0 }}>
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
    </div>
  );
};

export default Dashboard;
