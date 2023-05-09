import { motion } from "framer-motion";

/**
 * A simply loading component that mimics the iMessage typing indicator.
 */
export default function MessageLoadingPlaceholder() {
  return (
    <motion.div
      className="flex flex-row space-x-0.5 my-1 static"
      transition={{ duration: 1 }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <motion.div
        className="rounded-full my-1 h-2 w-2 bg-slate-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
      />
      <motion.div
        className="rounded-full my-1 h-2 w-2 bg-slate-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1, delay: 0.1 }}
      />
      <motion.div
        className="rounded-full my-1 h-2 w-2 bg-slate-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
      />
    </motion.div>
  );
}
