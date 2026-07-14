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

function ResetPasswordPage() {
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const pw = watch("password") ?? "";
  const confirmPw = watch("confirm") ?? "";
  const isMatch = confirmPw.length > 0 && pw === confirmPw;
  const strength = usePasswordStrength(pw);

  const onSubmit = async (v) => {
    if (v.password !== v.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    toast.success("Password updated");
    navigate("/login");
  };

  return (
    <AuthShell
      title="Set a new password"
      subtitle="Choose a strong password you don't use elsewhere."
      image={resetArt}
      caption="Create a new password"
      blurb="Choose a strong password you haven't used before on this account."
      showBack
      footer={
        <>
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Return to sign in
          </Link>
        </>
      }>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
          <PasswordField
            label="New password"
            show={showPw}
            onToggle={() => setShowPw((v) => !v)}
            error={errors.password?.message}
            register={register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "At least 8 characters" }
            })} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Password strength</span>
            <span className={cn("font-semibold", strength.color)}>{strength.label}</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {[0, 1, 2, 3].map((i) =>
              <div
                key={i}
                className={cn(
                  "h-1.5 rounded-full bg-border transition-colors",
                  i < strength.score && strength.bar
                )} />

            )}
          </div>

        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.18 }}>
          <PasswordField
            label="Confirm password"
            show={showPw}
            onToggle={() => setShowPw((v) => !v)}
            error={errors.confirm?.message}
            success={isMatch ? "Passwords match" : null}
            register={register("confirm", {
              required: "Please confirm your password",
              validate: (val) => val === pw || "Passwords do not match"
            })} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="submit"
            disabled={loading}
            className="h-14 w-full rounded-full bg-primary text-base text-primary-foreground shadow-elevated hover:bg-[var(--primary-hover)]">

            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update password"}
            {!loading && <ArrowRight className="h-4 w-4" />}
          </Button>
        </motion.div>
      </form>
    </AuthShell>);

}

function PasswordField({ label, show, onToggle, error, success, register }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-foreground">{label}</span>
      <div className="relative">
        <span className="pointer-events-none absolute left-2.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg bg-primary/10 text-primary">
          <Lock className="h-4 w-4" />
        </span>
        <input
          type={show ? "text" : "password"}
          className={`h-14 w-full rounded-2xl border bg-background pl-14 pr-12 text-sm shadow-soft transition-all placeholder:text-muted-foreground/70 focus:outline-none focus:ring-4 ${error ? "border-destructive focus:border-destructive focus:ring-destructive/15" : success ? "border-success focus:border-success focus:ring-success/15" : "border-border focus:border-primary focus:ring-primary/15"}`}
          {...register} />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground hover:bg-accent/40 hover:text-foreground"
          aria-label={show ? "Hide password" : "Show password"}>

          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {error && <span className="mt-1.5 block text-xs font-medium text-destructive">{error}</span>}
      {!error && success && <span className="mt-1.5 flex items-center gap-1 text-xs font-medium text-success"><CheckCircle2 className="h-3.5 w-3.5" /> {success}</span>}
    </label>);
}
function usePasswordStrength(pw) {
  return useMemo(() => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/\d/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    const map = [
      { label: "Too short", color: "text-muted-foreground", bar: "" },
      { label: "Weak", color: "text-destructive", bar: "bg-destructive" },
      { label: "Fair", color: "text-warning", bar: "bg-warning" },
      { label: "Good", color: "text-info", bar: "bg-info" },
      { label: "Strong", color: "text-success", bar: "bg-success" }];

    return { score, ...map[score] };
  }, [pw]);
}
export default ResetPasswordPage;
