
import forgotArt from "@/assets/auth/forgot.svg";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// TanStack Route removed

function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSent(true);
    toast.success("Reset link sent");
  };

  return (
    <AuthShell
      title="Forgot your password?"
      subtitle="Enter the email tied to your INADES account and we'll send a secure reset link."
      image={forgotArt}
      caption="Forgot your password?"
      blurb="It happens. Enter your email and we'll send you a secure reset link."
      showBack
      footer={
        <>
          Remembered it?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Back to sign in
          </Link>
        </>
      }>

      {sent ?
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-success/30 bg-success/5 p-6 text-center">

          <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-success/15 text-success">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-foreground">Check your inbox</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            We sent a password reset link. It expires in 30 minutes.
          </p>
          <Button asChild className="mt-6 h-12 w-full rounded-full bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]">
            <Link to="/reset-password">Continue <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </motion.div> :

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-foreground">Email address</span>
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
              {errors.email && <span className="mt-1.5 block text-xs font-medium text-destructive">{errors.email.message}</span>}
            </label>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              disabled={loading}
              className="h-14 w-full rounded-full bg-primary text-base text-primary-foreground shadow-elevated hover:bg-[var(--primary-hover)]">

              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send reset link"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </motion.div>
        </form>
      }
    </AuthShell>);

}
export default ForgotPasswordPage;
