import { useState } from "preact/hooks";
import styles from "./Login.module.css";
import Toast from "../../common/Toast/Toast";

const API_URL = "http://localhost:8000";

function Login() {
  const [toast, setToast] = useState<{
    text: string;
    type: "success" | "error" | null;
  }>({ text: "", type: null });
  const [toastOpen, setToastOpen] = useState(false);

  const showToast = (text: string, type: "success" | "error") => {
    setToast({ text, type });
    setToastOpen(true);
  };

  const handleToastClose = () => {
    setToastOpen(false);
  };

  const login = async () => {
    const username = (document.getElementById("username") as HTMLInputElement)
      .value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;

    if (!username || !password) {
      showToast("Usuário e senha são obrigatórios.", "error");
      return;
    }

    // Criar FormData para enviar no formato que o OAuth2PasswordRequestForm espera
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      body: formData,
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });

    console.log(
      "Response headers:",
      Object.fromEntries(response.headers.entries())
    );
    console.log("Response status:", response.status);
    const result = await response.json();
    console.log("Response body:", result);
    if (response.ok) {
      showToast("Autenticado com sucesso!", "success");
      // Armazena as informações do usuário
      const userData = {
        username: result.username,
        role: result.role,
      };
      localStorage.setItem("user", JSON.stringify(userData));

      // Dispara evento de login
      window.dispatchEvent(new Event("userLogin"));

      // Força atualização do estado do usuário
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "user",
          newValue: JSON.stringify(userData),
        })
      );

      // Redireciona baseado no papel do usuário
      if (result.role === "admin") {
        window.location.href = "/users";
      } else {
        window.location.href = "/";
      }
    } else {
      showToast(result.detail || "Erro ao fazer login", "error");
    }
  };

  return (
    <div className={styles.container}>
      <Toast
        text={toast.text}
        type={toast.type || "error"}
        open={toastOpen}
        onClose={handleToastClose}
      />
      <div className={styles.box}>
        <h2 className={styles.title}>Login</h2>
        <input
          type="text"
          id="username"
          placeholder="Usuário"
          className={styles.input}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="Senha"
          className={styles.input}
          required
        />
        <button onClick={login} className={styles.button}>
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;
