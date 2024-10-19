import { Suspense, lazy } from "react";
import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

const AdminMain = lazy(() => import("./pages/Admin/Main"));
const UserMain = lazy(() => import("./pages/User/Main"));

function App() {
  const location = useLocation();

  return (
    <Suspense fallback={<></>}>
      <Routes location={location} key={location.pathname}>
        <Route path="/admin/*" element={<AdminMain />} />
        <Route path="/*" element={<UserMain />} />
      </Routes>
    </Suspense>
  );
}

export default App;
