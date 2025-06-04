import { useEffect, useState } from "preact/hooks";
import { route } from "preact-router";
import styles from "./Dashboard.module.css";

const API_URL = "http://localhost:8000";

interface User {
  id: string;
  username: string;
  role: string;
}

function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/check`, {
          credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(
            response.status === 401 ? "Unauthorized" : "Forbidden"
          );
        }
        setUser(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
          route(
            err.message === "Unauthorized" ? "/unauthorized" : "/forbidden"
          );
        }
      }
    };

    checkAuth();
  }, []);

  if (error) return <div>{error}</div>;
  if (!user) return <div>Carregando...</div>;

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <div className={styles.userInfo}>
        <h2>Bem-vindo, {user.username}!</h2>
        <p>Seu papel: {user.role}</p>
      </div>
    </div>
  );
}

export default Dashboard;
