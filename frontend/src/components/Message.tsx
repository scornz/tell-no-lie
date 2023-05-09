import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import MessageLoadingPlaceholder from "./MessageLoadingPlaceholder";

type Props = {
  message: MessageInfo;
};

/**
 * A given message, which has a unique ID, some text, and whehter or not it
 * is still loading. The user determines style and alignment. The include
 * parameter determines whether or not to include the message in the API call
 * to OpenAI. The trial status is for if this is a response to a trial, and to
 * determine the status of the trial.
 */
export type MessageInfo = {
  user: "me" | "them" | "trial";
  text: string;
  id: number;
  loading: boolean;
  include: boolean;
  trialStatus: "correct" | "incorrect" | "none";
};

/**
 * A message, either from the user or the bot (or a preset list of messages, denoted
 * as type trial). Always contains text, and optionally for trial response messages,
 * an X or checkmark symbol to denote success or failure of the trial. Note, this
 * format was taken from a Framer Motion tutorial:
 * https://github.com/samselikoff/2022-08-24-staggered-imessage-animation
 */
export function Message({ message }: Props) {
  // Dependent on the type of message, specify the style, color, and alignment
  let style =
    "py-2 px-4 bg-blue-500 text-left rounded-3xl select-none flex -space-x-7 ";
  if (message.user === "me") {
    style += "bg-blue-500 ml-auto text-white";
  } else if (message.user === "trial") {
    style +=
      "bg-slate-100 text-slate-700 ml-auto border-4 border-black border-dashed";
  } else {
    style += "bg-gray-500 mr-auto text-white";
  }

  return (
    <div className="py-[3px] flex">
      <div
        className={style}
        style={{
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
                  {message.trialStatus === "correct" && (
                    <CheckCircleIcon className="text-lime-300" />
                  )}
                  {message.trialStatus === "incorrect" && (
                    <XCircleIcon className="text-rose-300" />
                  )}
                </motion.div>
              )}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
