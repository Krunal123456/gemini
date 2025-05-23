// src/pages/Login.js
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/"); // redirect to dashboard after login
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div style={{ padding: 30, textAlign: "center" }}>
      <h2>Login</h2>
      <button
        onClick={handleGoogleLogin}
        style={{
          padding: "10px 20px",
          backgroundColor: "#1976d2",
          color: "white",
          border: "none",
          borderRadius: 5,
          cursor: "pointer",
          fontSize: 16,
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
