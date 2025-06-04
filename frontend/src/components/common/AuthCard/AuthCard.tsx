import { useState } from "preact/hooks";
import styles from "./AuthCard.module.css";

interface AuthCardProps {
  title: string;
  onSubmit: (username: string, password: string) => Promise<void>;
  buttonLabel: string;
  message?: string;
  usernameLabel?: string;
  passwordLabel?: string;
  loading?: boolean;
  linkText?: string;
  linkHref?: string;
  linkAction?: () => void;
}

export default function AuthCard({
  title,
  onSubmit,
  buttonLabel,
  message,
  usernameLabel = "Usuário",
  passwordLabel = "Senha",
  loading = false,
  linkText,
  linkHref,
  linkAction,
}: AuthCardProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.inputGroup}>
          <span className={styles.icon}>
            <svg width="20" height="20" fill="currentColor">
              <circle cx="10" cy="10" r="8" />
            </svg>
          </span>
          <input
            type="text"
            placeholder={usernameLabel}
            value={username}
            onInput={(e) => setUsername((e.target as HTMLInputElement).value)}
            className={styles.input}
            autoComplete="username"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <span className={styles.icon}>
            <svg width="20" height="20" fill="currentColor">
              <rect x="4" y="8" width="12" height="8" rx="2" />
              <circle cx="10" cy="12" r="2" />
            </svg>
          </span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder={passwordLabel}
            value={password}
            onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
            className={styles.input}
            autoComplete="current-password"
            required
          />
          <button
            type="button"
            className={styles.showHide}
            onClick={() => setShowPassword((s) => !s)}
            tabIndex={-1}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "..." : buttonLabel}
        </button>
        {message && <div className={styles.message}>{message}</div>}
        {linkText && (linkHref || linkAction) && (
          <div className={styles.linkWrap}>
            {linkHref ? (
              <a href={linkHref} className={styles.link}>
                {linkText}
              </a>
            ) : (
              <button
                type="button"
                className={styles.linkBtn}
                onClick={linkAction}
              >
                {linkText}
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
