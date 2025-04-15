import { lazy, LocationProvider, ErrorBoundary, Router } from "preact-iso";
import Navbar from "./components/Navbar/Navbar";

const Login = lazy(() => import("./components/pages/Login"));
const Register = lazy(() => import("./components/pages/Register"));
const UsersList = lazy(() => import("./components/pages/UsersList"));
const MyInfo = lazy(() => import("./components/pages/UserInfo"));
const Home = lazy(() => import("./components/pages/Home"));

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
      </Router>
    </ErrorBoundary>
  </LocationProvider>
);

export default App;
