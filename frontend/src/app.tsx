import { lazy, LocationProvider, ErrorBoundary, Router } from "preact-iso";
import Navbar from "./components/Navbar/Navbar";

const Login = lazy(() => import("./components/pages/Login/Login"));
const Register = lazy(() => import("./components/pages/Register/Register"));
const UsersList = lazy(() => import("./components/pages/UsersList"));
const MyInfo = lazy(() => import("./components/pages/UserInfo"));
const Home = lazy(() => import("./components/pages/Home/Home"));
const owaspPages = [
  { path: "authentication-failures", name: "AuthenticationFailures" },
  { path: "broken-access", name: "BrokenAccess" },
  { path: "cryptographic-failures", name: "CryptographicFailures" },
  { path: "data-integrity-failures", name: "DataIntegrityFailures" },
  { path: "injection", name: "Injection" },
  { path: "insecure-design", name: "InsecureDesign" },
  { path: "outdated-components", name: "OutdatedComponents" },
  { path: "security-logging", name: "SecurityLogging" },
  { path: "security-misconfiguration", name: "SecurityMisconfiguration" },
  { path: "server-side-forgery", name: "ServerSideForgery" },
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
        {owaspRoutes.map(({ path, Component }) => (
          <Component path={path} />
        ))}
      </Router>
    </ErrorBoundary>
  </LocationProvider>
);

export default App;
