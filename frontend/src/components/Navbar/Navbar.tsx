import { useEffect, useState } from "preact/hooks";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [user, setUser] = useState<{ username: string; role: string } | null>(
    null
  );

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (err) {
        console.error("Erro ao parsear user:", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <a className={styles.link} href="/">
            Home
          </a>
        </li>
        <li>
          <a className={styles.link} href="/login">
            Login
          </a>
        </li>
        <li>
          <a className={styles.link} href="/register">
            Register
          </a>
        </li>
        <li>
          <a className={styles.link} href="/users">
            Users
          </a>
        </li>
        <li>
          <a className={styles.link} href="/me">
            My Info
          </a>
        </li>
        <li className={styles.dropdown}>
          <span className={styles.link}>Top 10 OWASP ⌄</span>
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

      {user && (
        <div className={styles.loggedUser}>
          Logado como: <strong>{user.username}</strong> ({user.role})
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
