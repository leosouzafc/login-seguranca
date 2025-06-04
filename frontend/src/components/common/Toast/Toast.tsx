import { useEffect } from "preact/hooks";

interface ToastProps {
  text: string;
  type: "success" | "error";
  open: boolean;
  onClose?: () => void;
}

export default function Toast({ text, type, open, onClose }: ToastProps) {
  useEffect(() => {
    if (open && onClose) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "10%",
        left: "95%",
        transform: "translateX(-95%)",
        right: 0,
        margin: "0 auto",
        zIndex: 9999,
        width: "fit-content",
        minWidth: 260,
        maxWidth: 400,
        padding: "1rem 2rem",
        borderRadius: 8,
        color: "#fff",
        background: type === "success" ? "#43e97b" : "#e94343",
        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.18)",
        textAlign: "center",
        fontWeight: 600,
        fontSize: "0.9rem",
        opacity: open ? 1 : 0,
        transition: "opacity 0.3s",
      }}
    >
      {text}
    </div>
  );
}
