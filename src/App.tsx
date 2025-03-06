import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthGuard } from "./lib/AuthGuard"
import Nav from "./Sidebar/nav/Nav"
import EmployeeProfile from "./Employee/employee-profile"
import Dashboard from "./Dashboard/Dashboard"
import SkillsView from "./Skills/SkillsView"
import EvaluationView from "./Evaluations/EvaluationView"
import Test from "./test/test"
import Notifications from "./Notification/notifications"
import Trainings from "./Formations/trainings"


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        <Route
          path="/Dashboard"
          element={
            <AuthGuard>
              <Nav>
                <Dashboard />
              </Nav>
            </AuthGuard>
          }
        />
        <Route
          path="/Formations"
          element={
            <AuthGuard>
              <Nav>
                <Trainings />
              </Nav>
            </AuthGuard>
          }
        />
        <Route
          path="/Skills"
          element={
            <AuthGuard>
              <Nav>
                <SkillsView />
              </Nav>
            </AuthGuard>
          }
        />
        <Route
          path="/Evaluations"
          element={
            <AuthGuard>
              <Nav>
                <EvaluationView />
              </Nav>
            </AuthGuard>
          }
        />
        <Route
          path="/Test"
          element={
            <AuthGuard>
              <Nav>
                <Test />
              </Nav>
            </AuthGuard>
          }
        />

        <Route
          path="/Notifications"
          element={
            <AuthGuard>
              <Nav>
                <Notifications />
              </Nav>
            </AuthGuard>
          }
        />
        <Route
          path="/Profile"
          element={
            <AuthGuard>
              <Nav>
                <EmployeeProfile />
              </Nav>
            </AuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

