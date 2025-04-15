import { useState } from "preact/hooks";

const API_URL = "http://localhost:8000";

function Login() {
  const [message, setMessage] = useState("");

  const login = async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    if (response.ok) {
      setMessage("Login bem-sucedido! Token: " + result.token);
      localStorage.setItem("token", result.token);
    } else {
      setMessage("Erro: " + result.detail);
    }
  };

  return (
    <div className="section">
      <h2>Login</h2>
      <input type="text" id="username" placeholder="Usuário" />
      <input type="password" id="password" placeholder="Senha" />
      <button onClick={login}>Entrar</button>
      <div>{message}</div>
    </div>
  );
}

export default Login;
