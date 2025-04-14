import { lazy, LocationProvider, ErrorBoundary, Router } from "preact-iso";
import Navbar from "./components/Navbar/Navbar";

const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const UsersList = lazy(() => import("./components/UsersList"));
const MyInfo = lazy(() => import("./components/UserInfo"));
const Home = lazy(() => import("./components/Home"));

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
