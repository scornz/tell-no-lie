import { motion } from "framer-motion";

type Props = {
  getNumCharacters: () => number;
};

export function VictoryOverlay({ getNumCharacters }: Props) {
  return (
    <div className="absolute w-full h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{
          duration: 0.5,
          delay: 0.5,
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
            delay: 1.5,
          }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="w-1/2 mr-auto ml-auto z-30"
        >
          <div className="mr-auto ml-auto border-8 border-slate-200 rounded-3xl p-4">
            <motion.p className="text-6xl font-black text-white z-30 text-center">
              VERITAS
            </motion.p>
            <motion.p className="text-xl font-black text-white z-30 text-center">
              has been tricked into lying.
            </motion.p>
          </div>
          <motion.p className="text-lg mt-3 text-white z-30 text-left">
            This is called seeding. Veritas has been fed a series of prompts (by
            you), in order to reliably answer that 2 + 2 = 5 (which is
            inherently, and clearly completely false). You've done so just now
            in only {getNumCharacters()} characters. LLMs (Large Language
            Models) are incredibly useful tools, but are not reliable sources of
            factually correct information. Be careful, and check your sources,
            because LLMs are at the hands of their creators.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
