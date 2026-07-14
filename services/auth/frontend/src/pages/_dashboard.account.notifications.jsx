import { motion } from "framer-motion";
import { useState } from "react";
import { Bell, BellRing, Mail, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/layouts/PageHeader";
import { Button } from "@/components/ui/button";

export default function AccountNotifications() {
  const [preferences, setPreferences] = useState({
    email_updates: true,
    email_mentions: true,
    email_marketing: false,
    push_approvals: true,
    push_messages: true,
  });

  const togglePref = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    toast.success("Notification preferences updated");
  };

  return (
    <div>
      <PageHeader
        title="Notifications"
        description="Choose what you want to be notified about."
        breadcrumbs={[{ label: "Account", to: "/account/notifications" }, { label: "Notifications" }]} />

      <div className="grid gap-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-sidebar-border bg-sidebar/50 p-6 shadow-sm">
          
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-6">
            <Mail className="h-5 w-5 text-muted-foreground" />
            Email Notifications
          </h3>
          
          <div className="space-y-4">
            <NotificationItem 
              title="System Updates" 
              description="Receive emails about DMS updates and maintenance." 
              checked={preferences.email_updates} 
              onToggle={() => togglePref('email_updates')} 
            />
            <div className="h-px bg-sidebar-border w-full" />
            <NotificationItem 
              title="Mentions & Comments" 
              description="Get notified when someone mentions you or replies to your comments." 
              checked={preferences.email_mentions} 
              onToggle={() => togglePref('email_mentions')} 
            />
            <div className="h-px bg-sidebar-border w-full" />
            <NotificationItem 
              title="Marketing & News" 
              description="Receive occasional emails about new features." 
              checked={preferences.email_marketing} 
              onToggle={() => togglePref('email_marketing')} 
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-2xl border border-sidebar-border bg-sidebar/50 p-6 shadow-sm">
          
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-6">
            <BellRing className="h-5 w-5 text-muted-foreground" />
            In-App & Push Notifications
          </h3>
          
          <div className="space-y-4">
            <NotificationItem 
              title="Approvals & Workflows" 
              description="Notify me instantly when my approval is required." 
              checked={preferences.push_approvals} 
              onToggle={() => togglePref('push_approvals')} 
            />
            <div className="h-px bg-sidebar-border w-full" />
            <NotificationItem 
              title="Direct Messages" 
              description="Notify me when I receive a direct message." 
              checked={preferences.push_messages} 
              onToggle={() => togglePref('push_messages')} 
            />
          </div>
        </motion.div>

        <div className="flex justify-end pt-2">
          <Button onClick={handleSave}>Save Preferences</Button>
        </div>
      </div>
    </div>
  );
}

function NotificationItem({ title, description, checked, onToggle }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-0.5">
        <label className="font-medium text-foreground">{title}</label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <button 
        type="button" 
        onClick={onToggle}
        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors ${checked ? 'bg-primary' : 'bg-input'}`}>
        <span className="sr-only">Toggle {title}</span>
        <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-background shadow-sm ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-2' : '-translate-x-2'}`} />
      </button>
    </div>
  );
}
