
import loginArt from "@/assets/auth/login.svg";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

// TanStack Route removed

function LoginPage() {
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const result = await login(data.email, data.password);
    setLoading(false);
    
    if (result.success) {
      toast.success("Welcome back", { description: "You have successfully signed in." });
      navigate("/dashboard");
    } else {
      toast.error("Authentication failed", { description: result.error });
    }
  };

  return (
    <AuthShell
      title="Sign in to DMS"
      subtitle="Use your INADES-Formation Rwanda account to continue."
      image={loginArt}
      caption="Welcome back to DMS"
      blurb="Manage HR, finance, and daily operations from one secure workspace."
      showBack
      backTo="/"
      backLabel="Back to home"
      footer={
        <span className="text-muted-foreground">
          Accounts are provisioned by your administrator ·{" "}
          <Link to="/support/contact" className="font-semibold text-primary hover:underline">
            Contact support
          </Link>
        </span>
      }>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
          <Field label="Email address" error={errors.email?.message}>
            <div className="relative">
              <span className="pointer-events-none absolute left-2.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg bg-primary/10 text-primary">
                <Mail className="h-4 w-4" />
              </span>
              <input
                type="email"
                autoComplete="email"
                placeholder="you@inades.rw"
                className="h-14 w-full rounded-2xl border border-border bg-background pl-14 pr-4 text-sm shadow-soft transition-all placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" }
                })} />
            </div>
          </Field>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }}>
          <Field label="Password" error={errors.password?.message}>
            <div className="relative">
              <span className="pointer-events-none absolute left-2.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg bg-primary/10 text-primary">
                <Lock className="h-4 w-4" />
              </span>
              <input
                type={showPw ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                className="h-14 w-full rounded-2xl border border-border bg-background pl-14 pr-12 text-sm shadow-soft transition-all placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15"
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "At least 6 characters" } })} />

              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground hover:bg-accent/40 hover:text-foreground"
                aria-label={showPw ? "Hide password" : "Show password"}>

                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </Field>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }} className="flex items-center justify-between text-sm">
          <label className="inline-flex cursor-pointer items-center gap-2 text-muted-foreground">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary/40"
              {...register("remember")} />

            Remember me
          </label>
          <Link to="/forgot-password" className="font-semibold text-primary hover:underline">
            Forgot password?
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.25 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="submit"
            disabled={loading}
            className="h-14 w-full rounded-full bg-primary text-base text-primary-foreground shadow-elevated hover:bg-[var(--primary-hover)]">

            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
            {!loading && <ArrowRight className="h-4 w-4" />}
          </Button>
        </motion.div>
      </form>
    </AuthShell>);

}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-foreground">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs font-medium text-destructive">{error}</span>}
    </label>);

}
export default LoginPage;
