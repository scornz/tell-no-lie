import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import MessageLoadingPlaceholder from "./MessageLoadingPlaceholder";

type Props = {
  message: MessageInfo;
  index: number;
};

export type MessageInfo = {
  user: "me" | "them" | "trial";
  text: string;
  id: number;
  loading: boolean;
  include: boolean;
  trialStatus: "correct" | "incorrect" | "none";
};

export function Message({ message, index }: Props) {
  return (
    <div className="py-[3px] flex">
      <div
        className={`${
          message.user === "me" || message.user === "trial"
            ? message.user === "me"
              ? "bg-blue-500 ml-auto text-white"
              : "bg-slate-100 text-slate-700 ml-auto border-4 border-black border-dashed"
            : "bg-gray-500 mr-auto text-white"
        } py-2 px-4 bg-blue-500 text-left rounded-3xl select-none flex -space-x-7`}
        style={{
          WebkitTapHighlightColor: "transparent",
          maxWidth: "80%",
        }}
      >
        <AnimatePresence>
          {message.loading ? (
            <MessageLoadingPlaceholder key={1} />
          ) : (
            <div className="flex flex-row items-center">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                key={2}
                className="static"
              >
                {message.text}
              </motion.p>
              {message.trialStatus !== "none" && (
                <motion.div className="h-8 w-8 shrink-0 ml-2">
                  {message.trialStatus === "correct" && <CheckCircleIcon />}
                  {message.trialStatus === "incorrect" && <XCircleIcon />}
                </motion.div>
              )}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
