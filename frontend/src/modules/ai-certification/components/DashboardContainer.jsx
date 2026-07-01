import React from "react";
import { motion } from "framer-motion";

export default function DashboardContainer({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-6 max-w-[1600px] mx-auto w-full px-1 py-2"
    >
      {children}
    </motion.div>
  );
}
