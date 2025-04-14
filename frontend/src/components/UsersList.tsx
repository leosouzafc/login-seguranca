import { useState } from "preact/hooks";

const API_URL = "http://localhost:8000";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users/`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Erro ao obter usuários: " + data.detail);
      }
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="section">
      <h2>Usuários</h2>
      <button onClick={fetchUsers}>Buscar Todos os Usuários</button>
      {error && <div>{error}</div>}
      <div>
        {users.map((user) => (
          <div key={user.username}>Usuário: {user.username}</div>
        ))}
      </div>
    </div>
  );
}

export default UsersList;
