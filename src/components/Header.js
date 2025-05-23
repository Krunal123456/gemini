import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase";

const Header = ({ toggleSidebar }) => {
  const { user } = useAuth();

  const handleLogout = () => auth.signOut();

  return (
    <header className="header">
      {/* Left: Logo & Sidebar toggle */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          className="menu-toggle"
          onClick={toggleSidebar}
          style={{
            fontSize: 24,
            background: "none",
            border: "none",
            color: "#1976d2",
            cursor: "pointer",
            marginRight: 15,
            display: "none"
          }}
        >
          ☰
        </button>
        <strong style={{ color: "#1976d2", fontSize: 20 }}>My Dashboard</strong>
      </div>

      {/* Right: Profile Info and Logout Button */}
      {user && (
        <div style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "auto" // 👈 Pushes to right
        }}>
          <img
            src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`}
            alt="avatar"
            style={{ width: 32, height: 32, borderRadius: "50%", marginRight: 10 }}
          />
          <span style={{ marginRight: 10 }}>{user.displayName}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </header>
  );
};

export default Header;
