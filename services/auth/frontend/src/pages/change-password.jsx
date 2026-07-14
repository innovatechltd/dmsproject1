// Standalone /change-password auth route used from the auth flow.
// Re-exports the dashboard change-password page component under a public URL.

import resetArt from "@/assets/auth/reset.svg";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/utils";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

// TanStack Route removed

function ChangePasswordAuth() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const pw = watch("password") ?? "";
  const confirmPw = watch("confirm") ?? "";
  const isMatch = confirmPw.length > 0 && pw === confirmPw;
  const strength = useMemo(() => score(pw), [pw]);

  const onSubmit = async (v) => {
    if (v.password !== v.confirm) return toast.error("Passwords do not match");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    toast.success("Password updated");
    navigate("/dashboard");
  };

  return (
    <AuthShell
      title="Change password"
      subtitle="For your security, please set a new password before continuing."
      image={resetArt}
      caption="Update your password"
      blurb="Keep your INADES account safe with a strong, unique password."
      showBack
      footer={<Link to="/dashboard" className="font-semibold text-primary hover:underline">Skip for now</Link>}>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
          <Row label="Current password" error={errors.current?.message}>
            <Pw show={show} onToggle={() => setShow((v) => !v)} reg={register("current", { required: "Required" })} />
          </Row>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }}>
          <Row label="New password" error={errors.password?.message}>
            <Pw show={show} onToggle={() => setShow((v) => !v)} reg={register("password", { required: "Required", minLength: { value: 8, message: "At least 8 characters" } })} />
          </Row>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Strength</span>
            <span className={cn("font-semibold", strength.color)}>{strength.label}</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {[0, 1, 2, 3].map((i) =>
              <div key={i} className={cn("h-1.5 rounded-full bg-border", i < strength.score && strength.bar)} />
            )}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.25 }}>
          <Row label="Confirm new password" error={errors.confirm?.message} success={isMatch ? "Passwords match" : null}>
            <Pw show={show} onToggle={() => setShow((v) => !v)} error={errors.confirm} success={isMatch} reg={register("confirm", { required: "Required", validate: (val) => val === pw || "Passwords do not match" })} />
          </Row>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }} whileTap={{ scale: 0.98 }}>
          <Button type="submit" disabled={loading} className="h-14 w-full rounded-full bg-primary text-base text-primary-foreground shadow-elevated hover:bg-[var(--primary-hover)]">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update password"}
            {!loading && <ArrowRight className="h-4 w-4" />}
          </Button>
        </motion.div>
      </form>
    </AuthShell>);

}

function Row({ label, error, success, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-foreground">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs font-medium text-destructive">{error}</span>}
      {!error && success && <span className="mt-1.5 flex items-center gap-1 text-xs font-medium text-success"><CheckCircle2 className="h-3.5 w-3.5" /> {success}</span>}
    </label>);

}
function Pw({ show, onToggle, reg, error, success }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-2.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg bg-primary/10 text-primary">
        <Lock className="h-4 w-4" />
      </span>
      <input type={show ? "text" : "password"} className={`h-14 w-full rounded-2xl border bg-background pl-14 pr-12 text-sm shadow-soft transition-all placeholder:text-muted-foreground/70 focus:outline-none focus:ring-4 ${error ? "border-destructive focus:border-destructive focus:ring-destructive/15" : success ? "border-success focus:border-success focus:ring-success/15" : "border-border focus:border-primary focus:ring-primary/15"}`} {...reg} />
      <button type="button" onClick={onToggle} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground hover:bg-accent/40 hover:text-foreground" aria-label="Toggle">
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>);

}
function score(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  const map = [
    { label: "Too short", color: "text-muted-foreground", bar: "" },
    { label: "Weak", color: "text-destructive", bar: "bg-destructive" },
    { label: "Fair", color: "text-warning", bar: "bg-warning" },
    { label: "Good", color: "text-info", bar: "bg-info" },
    { label: "Strong", color: "text-success", bar: "bg-success" }];

  return { score: s, ...map[s] };
}
export default ChangePasswordAuth;
