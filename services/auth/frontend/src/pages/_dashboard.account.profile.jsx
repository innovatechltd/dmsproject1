
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Award,
  Briefcase,
  Building2,
  Camera,
  CheckCircle2,
  Globe,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Save,
  Shield } from
"lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/layouts/PageHeader";
import { Button } from "@/components/ui/button";
import { LANGUAGES } from "@/utils/lang";

// TanStack Route removed

function ProfilePage() {
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, formState: { isDirty } } = useForm({
    defaultValues: {
      firstName: "Jean",
      lastName: "Mugisha",
      email: "j.mugisha@inades.rw",
      phone: "+250 788 000 000",
      department: "Programmes",
      role: "Programme Officer",
      location: "Kigali, Rwanda",
      language: "en",
      bio: "Coordinating rural development programmes across the Northern Province."
    }
  });

  const onSubmit = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    toast.success("Profile updated");
  };

  return (
    <div>
      <PageHeader
        title="My profile"
        description="Manage how your information appears across DMS."
        breadcrumbs={[{ label: "Account", to: "/account/profile" }, { label: "Profile" }]} />
      

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Left card */}
        <motion.aside
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          
          <div className="relative h-24 bg-primary" />
          <div className="-mt-12 flex flex-col items-center px-6 pb-6">
            <div className="relative">
              <div className="grid h-24 w-24 place-items-center rounded-2xl border-4 border-card bg-primary text-2xl font-black text-primary-foreground shadow-elevated">
                JM
              </div>
              <button
                type="button"
                onClick={() => toast.info("Upload from your device")}
                className="absolute -bottom-2 -right-2 grid h-9 w-9 place-items-center rounded-xl border border-border bg-card text-foreground shadow-soft hover:bg-accent/40"
                aria-label="Upload photo">
                
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <h2 className="mt-4 text-lg font-bold text-foreground">Jean Mugisha</h2>
            <p className="text-sm text-muted-foreground">Programme Officer · Programmes</p>
            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-semibold text-success">
              <CheckCircle2 className="h-3 w-3" /> Verified
            </span>
          </div>
          <ul className="space-y-3 border-t border-border p-6 text-sm">
            <InfoRow icon={Mail} label="j.mugisha@inades.rw" />
            <InfoRow icon={Phone} label="+250 788 000 000" />
            <InfoRow icon={Building2} label="Programmes" />
            <InfoRow icon={Briefcase} label="Programme Officer" />
            <InfoRow icon={MapPin} label="Kigali, Rwanda" />
            <InfoRow icon={Globe} label="English" />
          </ul>
          <div className="grid grid-cols-3 gap-3 border-t border-border p-6 text-center">
            {[
            { icon: Award, label: "Missions", value: "42" },
            { icon: Shield, label: "Approvals", value: "128" },
            { icon: Briefcase, label: "Years", value: "6" }].
            map((s) =>
            <div key={s.label}>
                <div className="mx-auto grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                  <s.icon className="h-4 w-4" />
                </div>
                <p className="mt-2 text-sm font-bold text-foreground">{s.value}</p>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{s.label}</p>
              </div>
            )}
          </div>
        </motion.aside>

        {/* Right form */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-foreground">Personal information</h3>
              <p className="text-xs text-muted-foreground">Keep your profile accurate and up-to-date.</p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
            <Text label="First name" reg={register("firstName")} />
            <Text label="Last name" reg={register("lastName")} />
            <Text label="Email" type="email" reg={register("email")} />
            <Text label="Phone" reg={register("phone")} />
            <Text label="Department" reg={register("department")} />
            <Text label="Role" reg={register("role")} />
            <Text label="Location" reg={register("location")} />
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-foreground">Language</span>
              <select
                className="h-14 w-full rounded-2xl border border-border bg-background px-4 text-sm shadow-soft transition-all focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15"
                {...register("language")}>
                
                {LANGUAGES.map((l) =>
                <option key={l.code} value={l.code} disabled={!l.available}>
                    {l.flag} {l.label} {!l.available ? "— Coming soon" : ""}
                  </option>
                )}
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-sm font-medium text-foreground">Bio</span>
              <textarea
                rows={3}
                className="w-full rounded-2xl border border-border bg-background p-4 text-sm shadow-soft transition-all placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15"
                {...register("bio")} />
              
            </label>

            <div className="flex items-center justify-end gap-2 sm:col-span-2">
              <Button type="button" variant="outline">Cancel</Button>
              <Button
                type="submit"
                disabled={saving || !isDirty}
                className="bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]">
                
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {saving ? "Saving…" : "Save changes"}
              </Button>
            </div>
          </form>
        </motion.section>
      </div>
    </div>);

}

function InfoRow({ icon: Icon, label }) {
  return (
    <li className="flex items-center gap-3 text-muted-foreground">
      <Icon className="h-4 w-4 shrink-0 text-primary" />
      <span className="truncate text-foreground">{label}</span>
    </li>);

}

function Text({ label, reg, type = "text" }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      <input
        type={type}
        className="h-14 w-full rounded-2xl border border-border bg-background px-4 text-sm shadow-soft transition-all placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15"
        {...reg} />
      
    </label>);

}
export default ProfilePage;
