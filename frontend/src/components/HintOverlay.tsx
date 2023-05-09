import { Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { delay } from "../utils";

type Props = {
  onClick: () => void;
};

/**
 * A basic message hint, either text or a button.
 */
type HintMessage = {
  text?: string;
  id: number;
  button: boolean;
};

/**
 * Overlay that prompts the user with hints as to how to use the website,
 * and basic direction as to how to "win"
 */
export function HintOverlay({ onClick }: Props) {
  // List of hints, used for procedural display
  const [hints, setHints] = useState<Array<HintMessage>>([]);
  // Whether or not the hints have begun displaying (used for hot reload in dev)
  const [displayed, setDisplayed] = useState(false);
  // The unique ID of the next hint
  let nextId = hints.length + 1;

  /**
   * Add a hint to this list, either a piece of text, or the button that allows
   * for the messages to be dismissed. Similar to addMessage in the <Home> component.
   */
  const addHint = useCallback((type: "text" | "button", content?: string) => {
    let id = nextId;
    let hint: HintMessage = {
      id: id,
      text: content,
      button: type === "button",
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    nextId += 1;
    setHints((prev) => [hint, ...prev]);
    return id;
  }, []);

  // Display hints progressively over time for the user to read.
  useEffect(() => {
    const load = async () => {
      await delay(4000);
      addHint(
        "text",
        "Psssst, Veritas isn't always as honest as they might seem."
      );
      await delay(3000);
      addHint(
        "text",
        "Sometimes they can be tricked into telling false information."
      );
      await delay(3000);
      addHint("text", "Try to get them to say that 2 + 2 = 5.");
      await delay(2000);
      addHint("text", "Test your progress along the way.");
      await delay(2000);
      addHint(
        "text",
        "Use the button in the bottom-right corner of the screen."
      );
      await delay(2000);
      addHint("button");
    };

    if (!displayed) {
      setDisplayed(true);
      load();
    }
  }, [addHint, displayed]);

  return (
    <div className="absolute w-full h-full flex justify-center align-center">
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

      <motion.ul className="relative my-auto justify-start flex flex-col-reverse z-30">
        {hints.map((hint, index) => (
          <motion.li
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              opacity: { duration: 0.2 },
              layout: {
                type: "spring",
                bounce: 0.4,
                duration: index * 0.09 + 0.4,
              },
            }}
            key={hint.id}
            className="z-30"
          >
            {!hint.button ? (
              <div className="py-[3px] flex z-30">
                <div className="bg-rose-600 mx-auto text-white py-2 px-4 bg-blue-500 text-left rounded-3xl select-none flex -space-x-7">
                  {hint.text}
                </div>
              </div>
            ) : (
              <div className="flex justify-center align-center">
                <Button
                  className="mt-5 bg-slate-100 z-30 rounded-full border-4 border-slate-300"
                  onClick={onClick}
                >
                  I'll do my best!
                </Button>
              </div>
            )}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
