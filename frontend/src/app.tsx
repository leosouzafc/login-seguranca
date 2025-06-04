import { lazy, LocationProvider, ErrorBoundary, Router } from "preact-iso";
import Navbar from "./components/common/Navbar/Navbar";

const Login = lazy(() => import("./components/pages/Login/Login"));
const Register = lazy(() => import("./components/pages/Register/Register"));
const UsersList = lazy(() => import("./components/pages/UsersList"));
const MyInfo = lazy(() => import("./components/pages/UserInfo"));
const Home = lazy(() => import("./components/pages/Home/Home"));
const Admin = lazy(() => import("./components/pages/Admin/Admin"));
const Dashboard = lazy(() => import("./components/pages/Dashboard/Dashboard"));

const owaspPages = [
  { path: "auth", name: "AuthenticationFailures" },
  { path: "broken-access", name: "BrokenAccess" },
  { path: "crypto", name: "CryptographicFailures" },
  { path: "data-integrity", name: "DataIntegrityFailures" },
  { path: "injection", name: "Injection" },
  { path: "insecure-design", name: "InsecureDesign" },
  { path: "outdated", name: "OutdatedComponents" },
  { path: "logging", name: "SecurityLogging" },
  { path: "misconfig", name: "SecurityMisconfiguration" },
  { path: "ssrf", name: "ServerSideForgery" },
];

const owaspRoutes = owaspPages.map(({ path, name }) => ({
  path: `/owasp/${path}`,
  Component: lazy(() => import(`./components/pages/Top10OWASP/${name}`)),
}));

const App = () => (
  <LocationProvider>
    <ErrorBoundary>
      <Navbar />
      <Router>
        <Home path="/" />
        <Login path="/login" />
        <Register path="/register" />
        <UsersList path="/users" />
        <MyInfo path="/me" />
        <Admin path="/admin" />
        <Dashboard path="/dashboard" />
        {owaspRoutes.map(({ path, Component }) => (
          <Component path={path} />
        ))}
      </Router>
    </ErrorBoundary>
  </LocationProvider>
);

export default App;
