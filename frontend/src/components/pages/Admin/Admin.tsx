import { useEffect, useState } from "preact/hooks";
import { route } from "preact-router";
import styles from "./Admin.module.css";

const API_URL = "http://localhost:8000";

interface User {
  id: string;
  username: string;
  role: string;
}

function Admin() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/check`, {
          credentials: "include",
        });
        const data = await response.json();
        if (!response.ok || data.role !== "admin") {
          throw new Error(
            response.status === 401 ? "Unauthorized" : "Forbidden"
          );
        }
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

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users/`, {
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Erro ao obter usuários: " + data.detail);
      }
      setUsers(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <h1>Painel Administrativo</h1>
      <button onClick={fetchUsers}>Listar Usuários</button>
      <div className={styles.userList}>
        {users.map((user) => (
          <div key={user.id} className={styles.userCard}>
            <p>ID: {user.id}</p>
            <p>Usuário: {user.username}</p>
            <p>Papel: {user.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
