import { useState, useEffect } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import {
  Sparkles,
  Mail,
  ArrowRight,
  Heart,
  Star,
  Gift,
  ShoppingBag,
  Tag,
  Package,
  Bookmark,
  TrendingUp,
  Clock,
} from "lucide-react";
import "./login-page.css";

// ─── Orbit icon config ───────────────────────────────────────────
interface OrbitIconConfig {
  icon: React.ElementType;
  orbitR: number;
  duration: number;
  startAngle: number;
  reverse?: boolean;
}

const ORBIT_ICONS: OrbitIconConfig[] = [
  // Inner ring (~120px)
  { icon: Heart,       orbitR: 120, duration: 48, startAngle: 0,   },
  { icon: Star,        orbitR: 120, duration: 48, startAngle: 120, reverse: true },
  { icon: Gift,        orbitR: 120, duration: 48, startAngle: 240, },

  // Middle ring (~200px)
  { icon: ShoppingBag, orbitR: 200, duration: 70, startAngle: 30,  },
  { icon: Tag,         orbitR: 200, duration: 70, startAngle: 150, reverse: true },
  { icon: Package,     orbitR: 200, duration: 70, startAngle: 270, },

  // Outer ring (~280px)
  { icon: Bookmark,    orbitR: 280, duration: 95, startAngle: 60,  },
  { icon: TrendingUp,  orbitR: 280, duration: 95, startAngle: 180, reverse: true },
  { icon: Clock,       orbitR: 280, duration: 95, startAngle: 300, },
];

// ─── Concentric rings (SVG circles) ─────────────────────────────
const RINGS = [
  { r: 120, strokeWidth: 1 },
  { r: 200, strokeWidth: 1 },
  { r: 280, strokeWidth: 1 },
];

// ─── Component ──────────────────────────────────────────────────
type LoginState = "form" | "sent";

export default function LoginPage() {
  const { signIn } = useAuthActions();

  const [loginState, setLoginState] = useState<LoginState>("form");
  const [email, setEmail] = useState("");
  const [sentEmail, setSentEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // ── Force dark mode on mount ─────────────────────────────────
  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => {
      // Don't remove on unmount — leave dark as app default
    };
  }, []);

  // ── Countdown after email sent ──────────────────────────────
  useEffect(() => {
    if (loginState !== "sent") return;

    setCountdown(60);
    setCanResend(false);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [loginState]);

  // ── Handlers ────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || isLoading) return;

    setIsLoading(true);
    try {
      await signIn("resend", { email: email.trim() });
      setSentEmail(email.trim());
      setLoginState("sent");
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResend() {
    if (!canResend || isLoading) return;
    setIsLoading(true);
    try {
      await signIn("resend", { email: sentEmail });
      setLoginState("sent");
    } catch (err) {
      console.error("Resend error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  const cx = 300;
  const cy = 300;

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "var(--surface-page)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 24px 52px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Ambient green glow behind circles ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 560,
          height: 560,
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, color-mix(in srgb, var(--border-focus) 6%, transparent) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Concentric circles + orbit icons ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          pointerEvents: "none",
          userSelect: "none",
          overflow: "hidden",
        }}
      >
        {/* SVG rings */}
        <svg
          viewBox="0 0 600 600"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          {RINGS.map(({ r, strokeWidth }, i) => (
            <circle
              key={i}
              className="concentric-ring"
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="var(--border-focus)"
              strokeWidth={strokeWidth}
            />
          ))}
        </svg>

        {/* Orbit icons */}
        {ORBIT_ICONS.map(({ icon: Icon, orbitR, duration, startAngle, reverse }, i) => (
          <div
            key={i}
            className={`orbit-icon${reverse ? " orbit-icon--reverse" : ""}`}
            style={
              {
                "--orbit-r": `${orbitR}px`,
                "--orbit-duration": `${duration}s`,
                animationDelay: `-${(startAngle / 360) * duration}s`,
              } as React.CSSProperties
            }
          >
            <Icon size={16} strokeWidth={1.5} />
          </div>
        ))}
      </div>

      {/* ── Content anchor (bottom) ── */}
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          gap: 0,
          position: "relative",
          zIndex: 1,
        }}
      >
        {loginState === "form" ? (
          <FormState
            email={email}
            setEmail={setEmail}
            isLoading={isLoading}
            onSubmit={handleSubmit}
          />
        ) : (
          <SentState
            email={sentEmail}
            countdown={countdown}
            canResend={canResend}
            isLoading={isLoading}
            onResend={handleResend}
            onBack={() => setLoginState("form")}
          />
        )}
      </div>
    </div>
  );
}

// ─── Form State ──────────────────────────────────────────────────
interface FormStateProps {
  email: string;
  setEmail: (v: string) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

function FormState({ email, setEmail, isLoading, onSubmit }: FormStateProps) {
  return (
    <form
      className="login-form-enter"
      onSubmit={onSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 14 }}
    >
      {/* Logo icon — circular container */}
      <div
        className="login-stagger stagger-1"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          marginBottom: 6,
        }}
      >
        {/* Icon ring */}
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "var(--radius-full)",
            background: "var(--surface-card)",
            border: "1.5px solid var(--border-default)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--action-primary)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 0 20px color-mix(in srgb, var(--action-primary) 15%, transparent)",
          }}
        >
          <Sparkles size={26} strokeWidth={1.5} />
        </div>

        {/* Wordmark */}
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              fontFamily: "'Switzer', system-ui, sans-serif",
              fontSize: "1.625rem",
              fontWeight: 500,
              color: "var(--text-primary)",
              margin: 0,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              textWrap: "balance",
            }}
          >
            wishes
          </h1>
          <p
            className="login-subtitle"
            style={{
              fontFamily: "'Manrope', system-ui, sans-serif",
              fontSize: "0.9375rem",
              fontWeight: 400,
              color: "var(--text-secondary)",
              margin: "4px 0 0",
              lineHeight: 1.6,
            }}
          >
            Suas listas, sempre à mão
          </p>
        </div>
      </div>

      {/* Email input */}
      <div className="login-stagger stagger-2">
        <input
          className="login-input"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          autoFocus
        />
      </div>

      {/* CTA — primary button */}
      <div className="login-stagger stagger-3">
        <button
          type="submit"
          className="login-btn-primary"
          disabled={isLoading || !email.trim()}
        >
          {isLoading ? (
            <>
              <span className="login-spinner" />
              Enviando…
            </>
          ) : (
            <>
              Entrar com email
              <ArrowRight size={16} strokeWidth={2} className="btn-arrow" />
            </>
          )}
        </button>
      </div>

      {/* Ghost CTA — visitor mode */}
      <div className="login-stagger stagger-4" style={{ textAlign: "center" }}>
        <button
          type="button"
          className="login-btn-ghost"
        >
          Explorar como visitante
        </button>
      </div>

      {/* Footer hint */}
      <div
        className="login-stagger stagger-5"
        style={{
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          color: "var(--text-muted)",
          fontSize: "0.8125rem",
          fontFamily: "'Manrope', system-ui, sans-serif",
          paddingTop: 4,
        }}
      >
        <Mail size={13} strokeWidth={1.5} />
        <span>sem senha necessária</span>
      </div>
    </form>
  );
}

// ─── Sent State ──────────────────────────────────────────────────
interface SentStateProps {
  email: string;
  countdown: number;
  canResend: boolean;
  isLoading: boolean;
  onResend: () => void;
  onBack: () => void;
}

function SentState({ email, countdown, canResend, isLoading, onResend, onBack }: SentStateProps) {
  const mm = String(Math.floor(countdown / 60)).padStart(2, "0");
  const ss = String(countdown % 60).padStart(2, "0");

  return (
    <div
      className="login-sent-enter"
      style={{
        background: "var(--surface-card)",
        border: "1.5px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        padding: "28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      {/* Icon + heading */}
      <div
        className="login-stagger stagger-1"
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "var(--radius-full)",
            background: "color-mix(in srgb, var(--action-primary) 12%, transparent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--action-primary)",
          }}
        >
          <Mail size={22} strokeWidth={1.5} />
        </div>

        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "'Manrope', system-ui, sans-serif",
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: 0,
            }}
          >
            Verifique seu email
          </h2>
          <p
            className="login-subtitle"
            style={{
              fontFamily: "'Manrope', system-ui, sans-serif",
              fontSize: "0.875rem",
              color: "var(--text-secondary)",
              margin: "6px 0 0",
              lineHeight: 1.5,
            }}
          >
            Enviamos um link para{" "}
            <span style={{ color: "var(--text-accent)", fontWeight: 600 }}>{email}</span>
          </p>
        </div>
      </div>

      {/* Info */}
      <div
        className="login-stagger stagger-2"
        style={{
          background: "color-mix(in srgb, var(--surface-elevated) 50%, transparent)",
          borderRadius: "var(--radius-md)",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          color: "var(--text-muted)",
          fontSize: "0.8125rem",
          fontFamily: "'Manrope', system-ui, sans-serif",
        }}
      >
        <Clock size={14} strokeWidth={1.5} style={{ flexShrink: 0 }} />
        <span>O link expira em 15 minutos</span>
      </div>

      {/* Resend button */}
      <div className="login-stagger stagger-3">
        <button
          className="login-btn-resend"
          onClick={onResend}
          disabled={!canResend || isLoading}
        >
          {isLoading ? (
            "Enviando…"
          ) : canResend ? (
            <>
              Reenviar link
              <ArrowRight size={15} strokeWidth={2} className="btn-arrow" />
            </>
          ) : (
            <>
              Reenviar em{" "}
              <span className="tabular-nums">
                {mm}:{ss}
              </span>
            </>
          )}
        </button>
      </div>

      {/* Back link */}
      <div
        className="login-stagger stagger-4"
        style={{ textAlign: "center" }}
      >
        <button
          type="button"
          className="login-btn-back"
          onClick={onBack}
        >
          Usar outro email
        </button>
      </div>
    </div>
  );
}
