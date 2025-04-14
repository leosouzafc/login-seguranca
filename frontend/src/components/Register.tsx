import { useState } from "preact/hooks";

const API_URL = "http://localhost:8000";

function Register() {
  const [message, setMessage] = useState("");

  const register = async () => {
    const username = document.getElementById("new-username").value;
    const password = document.getElementById("new-password").value;
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    if (response.ok) {
      setMessage("Usuário registrado com sucesso!");
    } else {
      setMessage("Erro: " + result.detail);
    }
  };

  return (
    <div className="section">
      <h2>Registrar</h2>
      <input type="text" id="new-username" placeholder="Novo Usuário" />
      <input type="password" id="new-password" placeholder="Nova Senha" />
      <button onClick={register}>Registrar</button>
      <div>{message}</div>
    </div>
  );
}

export default Register;
