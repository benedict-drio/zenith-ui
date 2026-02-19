import { motion } from "framer-motion";
import { Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
        <SettingsIcon className="w-8 h-8 text-primary" />
      </div>
      <h2 className="text-xl font-display font-bold text-foreground">Settings</h2>
      <p className="text-muted-foreground mt-2 max-w-sm">
        Account and integration settings are coming soon. Stay tuned!
      </p>
    </motion.div>
  );
}
