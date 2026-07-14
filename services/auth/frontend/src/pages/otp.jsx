
import otpArt from "@/assets/auth/otp.svg";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// TanStack Route removed

function OtpPage() {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);
  const refs = useRef([]);
  const navigate = useNavigate();

  const setAt = (i, v) => {
    const next = [...digits];
    next[i] = v.replace(/\D/g, "").slice(0, 1);
    setDigits(next);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };

  const onKeyDown = (i, e) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const onPaste = (e) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    e.preventDefault();
    const next = text.split("").concat(Array(6).fill("")).slice(0, 6);
    setDigits(next);
    refs.current[Math.min(text.length, 5)]?.focus();
  };

  const submit = async (e) => {
    e.preventDefault();
    if (digits.some((d) => !d)) {
      toast.error("Enter the 6-digit code");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    toast.success("Verified", { description: "Welcome to DMS." });
    navigate("/dashboard");
  };

  return (
    <AuthShell
      title="Verify it's you"
      subtitle="Enter the 6-digit verification code we sent to your email."
      image={otpArt}
      caption="Verify it's you"
      blurb="Enter the 6-digit code we sent to your email to finish signing in."
      showBack>

      <form onSubmit={submit} className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="flex justify-between gap-2.5 sm:gap-3" onPaste={onPaste}>
          {digits.map((d, i) =>
            <input
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => setAt(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              className={`h-14 w-full max-w-[52px] rounded-2xl border text-center text-xl font-bold shadow-soft outline-none transition-all
              ${d ? "border-primary/60 bg-primary/10 text-primary" : "border-border bg-background text-foreground"}
              focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/15`} />

          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }} className="flex items-center gap-2 rounded-xl border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-success" />
          Your verification code protects your INADES account. Never share it.
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="submit"
            disabled={loading}
            className="h-14 w-full rounded-full bg-primary text-base text-primary-foreground shadow-elevated hover:bg-[var(--primary-hover)]">

            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify & continue"}
            {!loading && <ArrowRight className="h-4 w-4" />}
          </Button>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.25 }} className="text-center text-sm text-muted-foreground">
          Didn't receive it?{" "}
          <button
            type="button"
            onClick={() => {
              setResent(true);
              toast.success("Code resent");
            }}
            className="font-semibold text-primary hover:underline">

            {resent ? "Resent ✓" : "Resend code"}
          </button>
        </motion.p>
      </form>
    </AuthShell>);

}
export default OtpPage;
