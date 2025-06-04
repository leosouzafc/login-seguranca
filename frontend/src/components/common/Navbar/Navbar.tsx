import { useEffect, useState } from "preact/hooks";
import styles from "./Navbar.module.css";
import { Divider, ListItemIcon, ListItemText } from "@mui/material";

const API_URL = "http://localhost:8000";

const Navbar = () => {
  const [user, setUser] = useState<{ username: string; role: string } | null>(
    null
  );

  useEffect(() => {
    // Função para atualizar o estado do usuário
    const updateUserState = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (err) {
          console.error("Erro ao parsear user:", err);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    // Atualiza o estado inicial
    updateUserState();

    // Adiciona listener para o evento de login
    window.addEventListener("userLogin", updateUserState);

    // Adiciona listener para mudanças no localStorage
    window.addEventListener("storage", (e) => {
      if (e.key === "user") {
        updateUserState();
      }
    });

    return () => {
      window.removeEventListener("userLogin", updateUserState);
      window.removeEventListener("storage", updateUserState);
    };
  }, []);

  const handleLogout = async () => {
    try {
      // Chama o endpoint de logout no backend
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      // Remove os dados do localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // Atualiza o estado
      setUser(null);

      // Redireciona para a página de login
      window.location.href = "/login";
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      // Mesmo com erro, tenta limpar os dados locais
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      window.location.href = "/login";
    }
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <a className={styles.link} href="/">
            Home
          </a>
        </li>
        <li></li>
        <li>
          <a className={styles.link} href="/register">
            Register
          </a>
        </li>
        {user && user.role === "admin" && (
          <li>
            <a className={styles.link} href="/users">
              Users
            </a>
          </li>
        )}
        {user && (
          <li>
            <a className={styles.link} href="/me">
              My Info
            </a>
          </li>
        )}
        <li className={styles.dropdown}>
          <span className={styles.link}>Top 10 OWASP</span>
          <ul className={styles.dropdownMenu}>
            <li>
              <a href="/owasp/auth">Authentication Failures</a>
            </li>
            <li>
              <a href="/owasp/broken-access">Broken Access Control</a>
            </li>
            <li>
              <a href="/owasp/crypto">Cryptographic Failures</a>
            </li>
            <li>
              <a href="/owasp/data-integrity">Data Integrity Failures</a>
            </li>
            <li>
              <a href="/owasp/injection">Injection</a>
            </li>
            <li>
              <a href="/owasp/insecure-design">Insecure Design</a>
            </li>
            <li>
              <a href="/owasp/outdated">Outdated Components</a>
            </li>
            <li>
              <a href="/owasp/logging">Security Logging</a>
            </li>
            <li>
              <a href="/owasp/misconfig">Security Misconfiguration</a>
            </li>
            <li>
              <a href="/owasp/ssrf">Server Side Request Forgery</a>
            </li>
          </ul>
        </li>
      </ul>

      {user ? (
        <div className={styles.loggedUser}>
          Logado como: <strong>{user.username}</strong> ({user.role})
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <a className={styles.link} href="/login">
          Login
        </a>
      )}
    </nav>
  );
};

export default Navbar;
