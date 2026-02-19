import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

export default function Refunds() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
        <RotateCcw className="w-8 h-8 text-primary" />
      </div>
      <h2 className="text-xl font-display font-bold text-foreground">Refunds</h2>
      <p className="text-muted-foreground mt-2 max-w-sm">
        Refund management is coming soon. Stay tuned!
      </p>
    </motion.div>
  );
}
