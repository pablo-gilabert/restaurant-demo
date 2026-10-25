import { lazy, Suspense, type ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { useDemo } from "./context/DemoContext";

const Home = lazy(() => import("./pages/Home/Home"));
const Menu = lazy(() => import("./pages/Menu/Menu"));
const Reservations = lazy(() => import("./pages/Reservations/Reservations"));
const About = lazy(() => import("./pages/About/About"));
const Login = lazy(() => import("./pages/AdminLogin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/AdminDashboard/AdminDashboard"));
const Catalog = lazy(() => import("./pages/AdminCatalog/AdminCatalog"));
const Hours = lazy(() => import("./pages/AdminHours/AdminHours"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
function RequireAdmin({ children }: { children: ReactNode }) {
    return useDemo().authenticated ? children : <Navigate to="/login" replace />;
}
export default function App() {
    return <><ScrollToTop /><Suspense fallback={<p role="status" className="mathilde-loading">Loading / Cargando…</p>}><Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<RequireAdmin><Navigate to="/admin/turnos" replace /></RequireAdmin>} />
        <Route path="/admin/turnos" element={<RequireAdmin><Dashboard /></RequireAdmin>} />
        <Route path="/admin/carta" element={<RequireAdmin><Catalog /></RequireAdmin>} />
        <Route path="/admin/horarios" element={<RequireAdmin><Hours /></RequireAdmin>} />
        <Route path="*" element={<NotFound />} />
    </Routes></Suspense></>;
}
