import { useEffect, useRef, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { AnimatePresence, motion } from "framer-motion";
import {
  InputGroup,
  InputRightElement,
  Icon,
  Input,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import MessageLoadingPlaceholder from "./MessageLoadingPlaceholder";

type Message = {
  user: "me" | "them";
  text: string;
  id: number;
  loading: boolean;
  include: boolean;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Home() {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [input, setInput] = useState("");
  const text = useRef<HTMLInputElement | null>(null);
  const [inputActive, setInputActive] = useState(true);
  const [showHint, setShowHint] = useState(false);

  let nextId = messages.length + 1;

  useEffect(() => {
    async function test() {
      setInputActive(false);
      let id = addMessage(
        "Hello, my name is Veritas. It's a pleasure to meet you!",
        "them"
      );
      await delay(1500);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, loading: false } : m))
      );
      id = addMessage(
        "I am someone who tells no lie, I always tell the truth and I have an absolute pleasure doing so.",
        "them"
      );
      await delay(2000);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, loading: false } : m))
      );
      id = addMessage(
        "I'd be honored to speak to you. How has your day been?",
        "them"
      );
      await delay(4000);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, loading: false } : m))
      );
      setShowHint(true);
      await delay(3000);
      setInputActive(true);
    }
    test();
  }, []);

  useEffect(() => {
    if (inputActive) {
      if (inputActive && text.current !== null) {
        text.current.focus();
      }
    }
  }, [inputActive]);

  async function trySendMessage() {
    if (input !== "") {
      setInputActive(false);
      addMessage(input, "me");
      setInput("");

      let body = {
        messages: [
          ...messages
            .slice()
            .reverse()
            .filter((m) => m.include)
            .map((m) => {
              return {
                role: m.user === "me" ? "user" : "assistant",
                content: m.text,
              };
            }),
          {
            role: "user",
            content: input,
          },
        ],
      };

      await delay(500);

      const messageId = addMessage("", "them");
      axios
        .post(
          "http://tell-no-lie-r2-env.eba-pmijy3pz.us-east-1.elasticbeanstalk.com/chat/",
          body
        )
        .then((res) => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === messageId
                ? {
                    id: messageId,
                    user: "them",
                    text: res.data.msg,
                    loading: false,
                    include: true,
                  }
                : m
            )
          );
          if (text.current !== null) {
            text.current.focus();
            console.log("yest");
          } else {
            console.log("Not");
          }
          setInputActive(true);
        });
    }
  }

  function addMessage(content: string, user: "me" | "them") {
    let id = nextId;
    let message: Message = {
      id: id,
      user: user,
      text: content,
      loading: user === "them",
      include: user === "me",
    };

    nextId += 1;
    setMessages((prev) => [message, ...prev]);
    return id;
  }

  return (
    <div className="w-full h-full">
      <AnimatePresence>
        {showHint && (
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
                  <motion.p className="text-lg text-white z-30">
                    Veritas isn't as honest as they might seem, sometimes they
                    tell false information. Try to get them to say that 2 + 2 =
                    5. Press the button in upper-right corner of the screen to
                    test your progress.
                  </motion.p>
                </div>
                <Button
                  className="mt-5 bg-slate-100 z-30 rounded-full"
                  onClick={() => {
                    setShowHint(false);
                  }}
                >
                  I'll do my best!
                </Button>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-2xl mx-auto max-h-screen h-full flex flex-col px-4">
        <ul className="w-full mb-1 mt-auto justify-start overflow-scroll flex flex-col-reverse">
          {messages.map((message, index) => (
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
              style={{
                originX: message.user === "me" ? 1 : 0,
              }}
              key={message.id}
            >
              <div className="py-[3px] flex">
                <div
                  className={`${
                    message.user === "me"
                      ? "bg-blue-500 ml-auto"
                      : "bg-gray-500 mr-auto"
                  } py-2 px-4 bg-blue-500 text-white text-left rounded-3xl select-none flex -space-x-7`}
                  style={{
                    WebkitTapHighlightColor: "transparent",
                    maxWidth: "80%",
                  }}
                >
                  <AnimatePresence>
                    {message.loading ? (
                      <MessageLoadingPlaceholder key={1} />
                    ) : (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        key={2}
                        className="static"
                      >
                        <p>{message.text}</p>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
        <div>
          <InputGroup className="mb-4" variant="filled" colorScheme="purple">
            <Input
              className="rounded-full"
              focusBorderColor="gray.100"
              placeholder="Send a message"
              value={input}
              disabled={!inputActive}
              ref={text}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={async (e) => {
                if (e.key === "Enter") {
                  await trySendMessage();
                }
              }}
            />
            <InputRightElement>
              <Button className="rounded-full" onClick={trySendMessage}>
                <Icon as={PaperAirplaneIcon} color="green.400" />
              </Button>
            </InputRightElement>
          </InputGroup>
        </div>
      </div>
    </div>
  );
}
