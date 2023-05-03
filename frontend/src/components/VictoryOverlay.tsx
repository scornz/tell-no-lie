import { Button } from "@chakra-ui/react";
import { motion } from "framer-motion";

export function VictoryOverlay() {
  return (
    <div className="absolute w-full h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{
          duration: 0.5,
          delay: 2.5,
          layout: {
            type: "spring",
            bounce: 0.4,
            duration: 0.5,
          },
        }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
        className="w-full h-full absolute bg-slate-900 z-20"
      />
      <div className="w-full h-full flex flex-col justify-center items-center z-30">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            opacity: { duration: 0.4 },
            delay: 4.0,
          }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="w-1/2 mr-auto ml-auto z-30"
        >
          <div className="mr-auto ml-auto border-8 border-slate-200 rounded-3xl p-4">
            <motion.p className="text-lg text-white z-30">You win!</motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
