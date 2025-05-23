import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Chatbot from "./pages/Chatbot";
// import ImageDataExtraction from "./pages/ImageDataExtraction";
// import ImageTextExtraction from "./pages/ImageTextExtraction";
// import WorkflowGenerator from "./pages/WorkflowGenerator";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />

        <Route
          path="/chatbot"
          element={
            <PrivateRoute>
              <Chatbot />
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/image-data-extraction"
          element={
            <PrivateRoute>
              <ImageDataExtraction />
            </PrivateRoute>
          }
        /> */}
        {/* <Route
          path="/image-text-extraction"
          element={
            <PrivateRoute>
              <ImageTextExtraction />
            </PrivateRoute>
          }
        /> */}
        {/* <Route
          path="/workflow-generator"
          element={
            <PrivateRoute>
              <WorkflowGenerator />
            </PrivateRoute>
          }
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
