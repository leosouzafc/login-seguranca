import { useState, useEffect } from "preact/hooks";
import { route } from "preact-router";
import styles from "./UsersList.module.css";
const API_URL = "http://localhost:8000";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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
      } catch (err: any) {
        setError(err.message);
        route(err.message === "Unauthorized" ? "/unauthorized" : "/forbidden");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/users/`, {
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Erro ao obter usuários");
      }
      setUsers(data);
      setError("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className={styles.container}>
      <h2>Usuários</h2>
      <button onClick={fetchUsers} className={styles.button}>
        Buscar Todos os Usuários
      </button>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.userList}>
        {users.map((user: any) => (
          <div key={user.username} className={styles.userCard}>
            <h3>{user.username}</h3>
            <p>Papel: {user.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersList;
