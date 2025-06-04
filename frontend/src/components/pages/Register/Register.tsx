import { useState } from "preact/hooks";
import styles from "./Register.module.css";
import Toast from "../../common/Toast/Toast";

const API_URL = "http://localhost:8000";

function Register() {
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

  const register = async () => {
    const username = (document.getElementById("username") as HTMLInputElement)
      .value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;

    if (!username || !password) {
      showToast("Usuário e senha são obrigatórios.", "error");
      return;
    }

    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (response.ok) {
      showToast("Usuário registrado com sucesso!", "success");
    } else {
      showToast("Erro: " + result.detail, "error");
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
        <h2 className={styles.title}>Registrar</h2>
        <input
          type="text"
          id="username"
          placeholder="Nome de usuário"
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
        <button onClick={register} className={styles.button}>
          Registrar
        </button>
      </div>
    </div>
  );
}

export default Register;
