
import { useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import { CheckCircle2, Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/layouts/PageHeader";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/utils";

// TanStack Route removed

function ChangePasswordPage() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const pw = watch("password") ?? "";
  const confirmPw = watch("confirm") ?? "";
  const isMatch = confirmPw.length > 0 && pw === confirmPw;
  const strength = useMemo(() => scoreStrength(pw), [pw]);

  const onSubmit = async (v) => {
    if (v.password !== v.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    reset();
    toast.success("Password updated");
  };

  return (
    <div>
      <PageHeader
        title="Change password"
        description="Rotate your password regularly. Use a passphrase you don't use elsewhere."
        breadcrumbs={[{ label: "Account", to: "/account/profile" }, { label: "Change password" }]} />
      

      <div className="max-w-xl rounded-2xl border border-border bg-card p-6 shadow-soft">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field label="Current password" error={errors.current?.message}>
            <PwInput register={register("current", { required: "Required" })} show={show} onToggle={() => setShow((v) => !v)} />
          </Field>
          <Field label="New password" error={errors.password?.message}>
            <PwInput register={register("password", { required: "Required", minLength: { value: 8, message: "At least 8 characters" } })} show={show} onToggle={() => setShow((v) => !v)} />
          </Field>

          <div>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Password strength</span>
              <span className={cn("font-semibold", strength.color)}>{strength.label}</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[0, 1, 2, 3].map((i) =>
              <div key={i} className={cn("h-1.5 rounded-full bg-border", i < strength.score && strength.bar)} />
              )}
            </div>
          </div>

          <Field label="Confirm new password" error={errors.confirm?.message} success={isMatch ? "Passwords match" : null}>
            <PwInput register={register("confirm", { required: "Required", validate: (val) => val === pw || "Passwords do not match" })} show={show} onToggle={() => setShow((v) => !v)} error={errors.confirm} success={isMatch} />
          </Field>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => reset()}>Cancel</Button>
            <Button type="submit" disabled={loading} className="bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Updating…" : "Update password"}
            </Button>
          </div>
        </form>
      </div>
    </div>);

}

function Field({ label, error, success, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs font-medium text-destructive">{error}</span>}
      {!error && success && <span className="mt-1 flex items-center gap-1 text-xs font-medium text-success"><CheckCircle2 className="h-3.5 w-3.5" /> {success}</span>}
    </label>);

}

function PwInput({ register, show, onToggle, error, success }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-2.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg bg-primary/10 text-primary">
        <Lock className="h-4 w-4" />
      </span>
      <input
        type={show ? "text" : "password"}
        className={`h-14 w-full rounded-2xl border bg-background pl-14 pr-12 text-sm shadow-soft transition-all placeholder:text-muted-foreground/70 focus:outline-none focus:ring-4 ${error ? "border-destructive focus:border-destructive focus:ring-destructive/15" : success ? "border-success focus:border-success focus:ring-success/15" : "border-border focus:border-primary focus:ring-primary/15"}`}
        {...register} />
      
      <button type="button" onClick={onToggle} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground hover:bg-accent/40 hover:text-foreground" aria-label="Toggle visibility">
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>);
}

function scoreStrength(pw) {
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
}
export default ChangePasswordPage;
