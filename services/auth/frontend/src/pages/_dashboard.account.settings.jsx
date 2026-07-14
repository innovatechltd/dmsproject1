import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useState } from "react";
import { Globe, Save, Loader2, Clock, MapPin } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/layouts/PageHeader";
import { Button } from "@/components/ui/button";

export default function AccountSettings() {
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, formState: { isDirty } } = useForm({
    defaultValues: {
      language: "en",
      timezone: "Africa/Kigali",
      dateFormat: "DD/MM/YYYY",
      timeFormat: "24h"
    }
  });

  const onSubmit = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    toast.success("Settings updated successfully");
  };

  return (
    <div>
      <PageHeader
        title="Account settings"
        description="Manage your regional and app preferences."
        breadcrumbs={[{ label: "Account", to: "/account/settings" }, { label: "Settings" }]} />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl rounded-2xl border border-sidebar-border bg-sidebar/50 shadow-sm">
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Globe className="h-5 w-5 text-muted-foreground" />
                Regional
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Language</label>
                  <select
                    {...register("language")}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="en">English (UK)</option>
                    <option value="fr">Français</option>
                    <option value="rw">Kinyarwanda</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Timezone</label>
                  <select
                    {...register("timezone")}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="Africa/Kigali">CAT (Africa/Kigali)</option>
                    <option value="Africa/Nairobi">EAT (Africa/Nairobi)</option>
                    <option value="Europe/London">GMT (Europe/London)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="h-px bg-sidebar-border w-full" />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                Date & Time Format
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Date format</label>
                  <select
                    {...register("dateFormat")}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Time format</label>
                  <select
                    {...register("timeFormat")}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="24h">24-hour (14:00)</option>
                    <option value="12h">12-hour (02:00 PM)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <Button type="submit" disabled={!isDirty || saving}>
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save changes
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
