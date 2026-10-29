import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Nomination from "./pages/Nomination";
import History from "./pages/History";
import Vote from "./pages/Vote";
import Dashboard from "./pages/Dashboard";
import loadDataToLocalStorage from "./services/loadDataToLocalStorage";
import MyNominations from "./pages/MyNominations";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  loadDataToLocalStorage();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/nomination"
            element={
              <ProtectedRoute>
                <Nomination />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vote"
            element={
              <ProtectedRoute>
                <Vote />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mynominations"
            element={
              <ProtectedRoute>
                <MyNominations />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
