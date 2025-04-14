import { useState } from "preact/hooks";

const API_URL = "http://localhost:8000";

function UserInfo() {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState("");

  const fetchMyInfo = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          "Erro ao obter as informações do usuário: " +
            (data.detail || response.statusText)
        );
      }
      setInfo(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="section">
      <h2>Minhas Informações</h2>
      <button onClick={fetchMyInfo}>Buscar Minhas Informações</button>
      {error && <div>{error}</div>}
      {info && (
        <div>
          <div>Usuário: {info.username}</div>
          <div>Número: {info.id}</div>
          <div>Função: {info.role}</div>
        </div>
      )}
    </div>
  );
}

export default UserInfo;
